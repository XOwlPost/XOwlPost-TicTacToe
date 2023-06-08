module.exports = {
    purge: ['./src/**/*.html', './src/**/*.js'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Define your custom colors
          primary: '#FF0000',
          secondary: '#00FF00',
          accent: '#0000FF',
          custom: {
            '50': '#F9FAFB',
            '100': '#F3F4F6',
            '200': '#E5E7EB',
            '300': '#D1D5DB',
            '400': '#9CA3AF',
            '500': '#6B7280',
            '600': '#4B5563',
            '700': '#374151',
            '800': '#1F2937',
            '900': '#111827',
          },
        },
        fontSize: {
          '4xl': ['2.5rem', '1.2'],
          '5xl': ['3rem', '1.2'],
          'custom': '1.875rem',
        },
        spacing: {
          '7': '1.75rem',
          '8': '2rem',
          'custom': '3rem',
        },
        borderWidth: {
          '3': '3px',
          '4': '4px',
          'custom': '5px',
        },
        fontFamily: {
          sans: ['Roboto', 'Arial', 'sans-serif'],
          custom: ['Open Sans', 'Arial', 'sans-serif'],
        },
        boxShadow: {
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'custom': '0 0 1rem rgba(0, 0, 0, 0.2)',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '2rem',
          'custom': '3rem',
        },
        opacity: {
          '80': '0.8',
          '90': '0.9',
          'custom': '0.75',
        },
        zIndex: {
          '1': '10',
          '2': '20',
          'custom': '30',
        },
      },
      accessibility: ['responsive', 'focus', 'sr-only', 'not-sr-only'],
      extend: {
        outline: ['responsive', 'focus', 'focus:outline-none'],
      },
    },
    variants: {
      extend: {
        opacity: ['disabled'],
        textColor: ['active'],
        backgroundColor: ['checked'],
        borderColor: ['checked'],
      },
    },
    plugins: [
      require('tailwindcss-forms'),
      require('tailwindcss-animations'),
      require('tailwindcss-aspect-ratio'),
      require('tailwindcss-grid'),
      require('tailwindcss-scrollbar'),
      require('@tailwindcss/typography'),
    ],
  };
  