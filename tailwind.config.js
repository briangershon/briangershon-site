/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,liquid,md}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#374151',
            '[class~="lead"]': {
              color: '#4b5563',
            },
            a: {
              color: '#111827',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal',
            },
            'h1': {
              color: '#111827',
              fontWeight: '800',
            },
            'h2': {
              color: '#111827',
              fontWeight: '700',
            },
            'h3': {
              color: '#111827',
              fontWeight: '600',
            },
            'h4': {
              color: '#111827',
              fontWeight: '600',
            },
            'code': {
              color: '#111827',
              fontWeight: '600',
            },
            'pre': {
              color: '#e5e7eb',
              backgroundColor: '#1f2937',
            },
            'blockquote': {
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#111827',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#e5e7eb',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
          },
        },
      },
    },
  },
  plugins: [],
};