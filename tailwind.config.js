/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                primary: "#D82D2B",
                secondary: "#e0e0e0",
            },
        },
    },
    plugins: [],
};
