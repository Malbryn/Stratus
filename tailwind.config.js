/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                display: ["Montserrat", "sans-serif"],
            },
            fontSize: {
                12: "12px",
                14: "14px",
                16: "16px",
                18: "18px",
                20: "20px",
                24: "24px",
                32: "32px",
                48: "48px",
            },
            width: {
                "px-128": "128px",
                "px-256": "256px",
                "px-386": "386px",
            },
            height: {
                "px-54": "54px",
            },
            maxWidth: {
                "px-256": "256px",
            },
            backgroundImage: {
                placeholder_light:
                    "url('/assets/placeholders/placeholder_dark.png')",
            },
            backgroundSize: {
                300: "300px",
            },
        },
    },
    plugins: [],
};
