/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'brand': {
                    'black': '#000000',
                    'navy': '#018941',
                    'dark-green': '#02542D',
                    'gray-dark': '#6A6A6A',
                    'gray': '#A8A8A8',
                    'gray-light': '#C1C1C1',
                    'gray-lighter': '#D9D9D9',
                    'yellow-light': '#DBDA97',
                    'yellow': '#FFD966',
                    'white': '#FFFFFF'
                }
            },
            fontFamily: {
                'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
                'kyobo': ['Kyobo Handwriting 2020', 'cursive']
            }
        },
    },
    plugins: [],
};
