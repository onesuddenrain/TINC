/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        './Pages/**/*.cshtml',
        './Views/**/*.cshtml'
    ],
    theme: {
        screens: {
            'smc': '700px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    plugins: [],
}

