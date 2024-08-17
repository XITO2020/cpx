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
        'recoil':['Recoleta'],
        'mag':['Magazine'],
        'magbold':['Magazine-Bold'],
        'matrix':['matrix'],
        'candle':['candle'],
        'toejam': ['toe-jam'],
        'earl': ['earl'],
        'random': ['doubledecker'],
        'bebas': ['bebas'],
        'marvel': ['marvel'],
      },
      backgroundImage: {
        'hero-pattern': "url('/img/retour.gif')",
        'footer-texture': "url('/img/heroicons.png')",
      },
      opacity: {
        '30': '0.3',
        '50': '0.5',
        '70': '0.7', 
        '90': '0.9', 
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(75, 125, 100, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
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
