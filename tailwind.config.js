const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx, html}',
    './pages/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'toejam': ['toe-jam'],
        'earl': ['earl'],
        'random': ['doubledecker']
      },
      backgroundImage: {
        'hero-pattern': "url('/img/hero.jpg')",
        'footer-texture': "url('/img/heroicons.png')",
      },
      animation: {
        lowsliding: 'lowsliding 80s infinite',
      },
      keyframes: {
        lowsliding: {
          '0%': { marginLeft: '0' },
          '50%': { marginLeft: '-100vw' },
          '100%': { marginLeft: '0' },
        },
      },
    }
  },
  variants: {},
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('optional', '&:optional');
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('inverted-colors', '@media (inverted-colors: inverted)');
    }),
    plugin(function ({ addVariant, e }) {
      addVariant('group-hover:item', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group:hover .${e(`item${separator}${className}`)}`;
        });
      });
    })
  ]
}
