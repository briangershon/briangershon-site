#!/usr/bin/env bash

# Blog Post Update Script
# Uploads a single blog post to the API
# Usage: ./scripts/update-post.sh <slug>

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if slug argument provided
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: No slug provided${NC}"
    echo "Usage: $0 <slug>"
    echo "Example: $0 bluesky-daily-mcp-server"
    exit 1
fi

SLUG="$1"
POSTS_DIR="src/blog/posts"
POST_FILE="${POSTS_DIR}/${SLUG}.md"
API_URL="https://api.stashfive.com/api/posts/${SLUG}"

# Check if API_KEY is set
if [ -z "${API_KEY:-}" ]; then
    echo -e "${RED}Error: API_KEY environment variable not set${NC}"
    echo "Please set your API key: export API_KEY=\"your-api-key-here\""
    exit 1
fi

# Check if post file exists
if [ ! -f "$POST_FILE" ]; then
    echo -e "${RED}Error: Post file not found${NC}"
    echo "Expected location: $POST_FILE"
    echo ""
    echo "Available posts in ${POSTS_DIR}:"
    ls -1 "${POSTS_DIR}"/*.md 2>/dev/null | xargs -n1 basename -s .md || echo "  (none found)"
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${RED}Error: jq is not installed${NC}"
    echo "Please install jq: brew install jq"
    exit 1
fi

echo -e "${YELLOW}📝 Updating post: ${SLUG}${NC}"
echo "File: $POST_FILE"
echo ""

# Read the file content and create JSON payload
CONTENT=$(cat "$POST_FILE")
PAYLOAD=$(jq -n --arg content "$CONTENT" '{content: $content}')

# Send PUT request
echo "Uploading to API..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD" \
    "$API_URL")

# Extract HTTP status code (last line) and body (all but last line)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo ""

# Check response
if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    echo -e "${GREEN}✅ Successfully updated post: ${SLUG}${NC}"
    if [ -n "$BODY" ]; then
        echo "Response: $BODY" | jq '.' 2>/dev/null || echo "Response: $BODY"
    fi
    exit 0
else
    echo -e "${RED}❌ Failed to update post${NC}"
    echo "HTTP Status: $HTTP_CODE"
    if [ -n "$BODY" ]; then
        echo "Response: $BODY" | jq '.' 2>/dev/null || echo "Response: $BODY"
    fi
    exit 1
fi
