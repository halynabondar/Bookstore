/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f5f8ff",
                    100: "#e6eeff",
                    500: "#4463ff",
                    600: "#344eea",
                    700: "#2a3fbe",
                },
            },
        },
    },
    plugins: [],
}