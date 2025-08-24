---
title: 5 TypeScript Tips for Better Code
description: Essential TypeScript patterns and techniques that will improve your code quality and developer experience.
date: 2024-08-22
tags:
  - typescript
  - programming
  - tips
  - best practices
layout: layouts/post.liquid
---

TypeScript has become an essential tool for JavaScript development, providing type safety and better developer experience. Here are five tips that have significantly improved my TypeScript code over the years.

## 1. Use Strict Configuration

Always start with strict TypeScript settings. Add these to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true
  }
}
```

These settings catch more potential issues at compile time and lead to more robust code.

## 2. Leverage Union Types and Type Guards

Union types and type guards are powerful patterns for handling different data shapes:

```typescript
type Status = "loading" | "success" | "error";

interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: any[];
}

interface ErrorState {
  status: "error";
  error: string;
}

type AppState = LoadingState | SuccessState | ErrorState;

function handleState(state: AppState) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Loaded ${state.data.length} items`;
    case "error":
      return `Error: ${state.error}`;
  }
}
```

## 3. Use Template Literal Types

Template literal types allow you to create precise string types:

```typescript
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ClassName = `${Color}-${Size}`; // 'red-small' | 'red-medium' | ...

function createClass(className: ClassName) {
  return className; // Type-safe!
}

createClass("red-small"); // ✅
createClass("purple-tiny"); // ❌ Type error
```

## 4. Master Utility Types

TypeScript's built-in utility types are incredibly useful:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick specific properties
type PublicUser = Pick<User, "id" | "name" | "email">;

// Omit sensitive properties
type SafeUser = Omit<User, "password">;

// Make properties optional
type PartialUser = Partial<User>;

// Make properties required
type RequiredUser = Required<Partial<User>>;
```

## 5. Create Custom Type Guards

Type guards help TypeScript understand your runtime checks:

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj
  );
}

// Usage
function processData(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(data.name);
  }
}
```

## Bonus: Use `satisfies` Operator

The `satisfies` operator (TypeScript 4.9+) lets you validate that an expression matches a type without widening its type:

```typescript
type Colors = "red" | "green" | "blue";

const palette = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
} satisfies Record<Colors, string>;

// palette.red is still string literal '#ff0000', not just string
```

## Conclusion

These TypeScript features help write more maintainable and bug-free code. The key is to embrace the type system rather than fighting it – let TypeScript guide you toward better patterns and catch issues before they reach production.

What are your favorite TypeScript features? Have you found other patterns that significantly improved your code quality?
