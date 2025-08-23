/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Pretendard Variable',
                    'Pretendard',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Noto Sans KR',
                    'Apple SD Gothic Neo',
                    'Malgun Gothic',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
                kyobo: ['KyoboHandwriting2020A', 'serif'],
            },
        },
    },
    plugins: [],
};
