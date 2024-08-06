function defaultColor(baseName) {
  return `var(--${baseName})`;
}

function generateColorShades(baseName) {
  return {
    50: `var(--${baseName}-50)`,
    100: `var(--${baseName}-100)`,
    200: `var(--${baseName}-200)`,
    300: `var(--${baseName}-300)`,
    400: `var(--${baseName}-400)`,
    500: `var(--${baseName}-500)`,
    600: `var(--${baseName}-600)`,
    700: `var(--${baseName}-700)`,
    800: `var(--${baseName}-800)`,
    900: `var(--${baseName}-900)`,
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  prefix: 'nt-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: defaultColor('nv-color-primary'), ...generateColorShades('nv-color-primary') },
        'primary-alpha': generateColorShades('nv-color-primary-alpha'),
        'primary-foreground': defaultColor('nv-color-primary-foreground'),
        'primary-foreground-alpha': generateColorShades('nv-color-primary-foreground-alpha'),
        secondary: { DEFAULT: defaultColor('nv-color-secondary'), ...generateColorShades('nv-color-secondary') },
        'secondary-alpha': generateColorShades('nv-color-secondary-alpha'),
        'secondary-foreground': defaultColor('nv-color-secondary-foreground'),
        'secondary-foreground-alpha': generateColorShades('nv-color-secondary-foreground-alpha'),
        counter: { DEFAULT: defaultColor('nv-color-counter'), ...generateColorShades('nv-color-counter') },
        'counter-foreground': defaultColor('nv-color-counter-foreground'),
        'counter-foreground-alpha': generateColorShades('nv-color-accent-foreground-alpha'),
        background: defaultColor('nv-color-background'),
        'background-alpha': generateColorShades('nv-color-background-alpha'),
        foreground: defaultColor('nv-color-foreground'),
        'foreground-alpha': generateColorShades('nv-color-foreground-alpha'),
        'neutral-alpha': generateColorShades('nv-color-neutral-alpha'),
      },
      keyframes: {
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-down': 'fade-down 0.5s ease-in-out',
        'fade-up': 'fade-up 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/line-clamp')],
};
