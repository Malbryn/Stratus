/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary-100': 'hsl(0, 0%, 8%)',
                'primary-200': 'hsl(0, 0%, 13%)',
                'primary-300': 'hsl(0, 0%, 18%)',
                'primary-400': 'hsl(0, 0%, 33%)',
                'primary-500': 'hsl(0, 0%, 50%)',
                'primary-600': 'hsl(0, 0%, 66%)',
                'primary-700': 'hsl(0, 0%, 82%)',
                'primary-800': 'hsl(0, 0%, 87%)',
                'primary-900': 'hsl(0, 0%, 92%)',
            },
            fontFamily: {
                display: ['Montserrat', 'sans-serif'],
            },
            fontSize: {
                12: '12px',
                14: '14px',
                16: '16px',
                18: '18px',
                20: '20px',
                24: '24px',
                32: '32px',
                48: '48px',
            },
            width: {
                'px-128': '128px',
                'px-256': '256px',
                'px-386': '386px',
            },
            height: {
                'px-54': '54px',
            },
            maxWidth: {
                'px-256': '256px',
            },
            backgroundImage: {
                placeholder_light:
                    "url('/assets/placeholders/placeholder_dark.png')",
            },
            backgroundSize: {
                300: '300px',
            },
        },
    },
    plugins: [],
};
