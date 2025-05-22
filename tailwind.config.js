const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sorcery theme colors
        sorcery: {
          primary: {
            light: '#9333ea', // Purple primary
            dark: '#581c87'
          },
          secondary: {
            light: '#7e22ce', // Purple secondary
            dark: '#3b0764'
          },
          accent: {
            light: '#a855f7', // Purple accent
            dark: '#6b21a8'
          },
          button: {
            primary: {
              light: '#8b5cf6',
              dark: '#4c1d95'
            },
            secondary: {
              light: '#c084fc',
              dark: '#5b21b6'
            }
          },
          text: {
            light: '#1e1b4b',
            dark: '#e9d5ff'
          },
          background: {
            light: '#f3e8ff',
            dark: '#2e1065'
          }
        },
        // Conspix theme colors
        conspix: {
          primary: {
            light: '#e11d48', // Rose primary
            dark: '#881337'
          },
          secondary: {
            light: '#f43f5e', // Rose secondary
            dark: '#9f1239'
          },
          accent: {
            light: '#fb7185', // Rose accent
            dark: '#be123c'
          },
          button: {
            primary: {
              light: '#f43f5e',
              dark: '#9f1239'
            },
            secondary: {
              light: '#fb7185',
              dark: '#be123c'
            }
          },
          text: {
            light: '#27272a',
            dark: '#fecdd3'
          },
          background: {
            light: '#fff1f2',
            dark: '#4c0519'
          }
        }
      },
      fontFamily: {
        // Sorcery fonts
        sorcery: {
          heading: ['Cinzel', 'serif'],
          body: ['Crimson Text', 'serif']
        },
        // Conspix fonts
        conspix: {
          heading: ['Montserrat', 'sans-serif'],
          body: ['Inter', 'sans-serif']
        }
      },
      boxShadow: {
        // Sorcery shadows
        'sorcery-sm': '0 2px 4px rgba(147, 51, 234, 0.1)',
        'sorcery-md': '0 4px 6px rgba(147, 51, 234, 0.15)',
        'sorcery-lg': '0 10px 15px rgba(147, 51, 234, 0.2)',
        // Conspix shadows
        'conspix-sm': '0 2px 4px rgba(225, 29, 72, 0.1)',
        'conspix-md': '0 4px 6px rgba(225, 29, 72, 0.15)',
        'conspix-lg': '0 10px 15px rgba(225, 29, 72, 0.2)',
      }
    }
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        // Sorcery theme components
        '.sorcery-input': {
          '@apply bg-sorcery-background-light dark:bg-sorcery-background-dark': {},
          '@apply text-sorcery-text-light dark:text-sorcery-text-dark': {},
          '@apply border-sorcery-primary-light dark:border-sorcery-primary-dark': {},
          '@apply focus:ring-sorcery-accent-light dark:focus:ring-sorcery-accent-dark': {},
          '@apply rounded-lg border px-4 py-2 focus:outline-none focus:ring-2': {},
        },
        '.sorcery-nav': {
          '@apply bg-gradient-to-r from-sorcery-primary-light to-sorcery-secondary-light': {},
          '@apply dark:from-sorcery-primary-dark dark:to-sorcery-secondary-dark': {},
        },
        '.sorcery-button-primary': {
          '@apply bg-sorcery-button-primary-light text-white': {},
          '@apply dark:bg-sorcery-button-primary-dark': {},
          '@apply hover:bg-sorcery-button-secondary-light': {},
          '@apply dark:hover:bg-sorcery-button-secondary-dark': {},
          '@apply rounded-lg px-4 py-2 transition-colors': {},
        },
        '.sorcery-button-secondary': {
          '@apply bg-sorcery-button-secondary-light text-white': {},
          '@apply dark:bg-sorcery-button-secondary-dark': {},
          '@apply hover:bg-sorcery-button-primary-light': {},
          '@apply dark:hover:bg-sorcery-button-primary-dark': {},
          '@apply rounded-lg px-4 py-2 transition-colors': {},
        },

        // Conspix theme components
        '.conspix-input': {
          '@apply bg-conspix-background-light dark:bg-conspix-background-dark': {},
          '@apply text-conspix-text-light dark:text-conspix-text-dark': {},
          '@apply border-conspix-primary-light dark:border-conspix-primary-dark': {},
          '@apply focus:ring-conspix-accent-light dark:focus:ring-conspix-accent-dark': {},
          '@apply rounded-lg border px-4 py-2 focus:outline-none focus:ring-2': {},
        },
        '.conspix-nav': {
          '@apply bg-gradient-to-r from-conspix-primary-light to-conspix-secondary-light': {},
          '@apply dark:from-conspix-primary-dark dark:to-conspix-secondary-dark': {},
        },
        '.conspix-button-primary': {
          '@apply bg-conspix-button-primary-light text-white': {},
          '@apply dark:bg-conspix-button-primary-dark': {},
          '@apply hover:bg-conspix-button-secondary-light': {},
          '@apply dark:hover:bg-conspix-button-secondary-dark': {},
          '@apply rounded-lg px-4 py-2 transition-colors': {},
        },
        '.conspix-button-secondary': {
          '@apply bg-conspix-button-secondary-light text-white': {},
          '@apply dark:bg-conspix-button-secondary-dark': {},
          '@apply hover:bg-conspix-button-primary-light': {},
          '@apply dark:hover:bg-conspix-button-primary-dark': {},
          '@apply rounded-lg px-4 py-2 transition-colors': {},
        }
      });
    })
  ]
}