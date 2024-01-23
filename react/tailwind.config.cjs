/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {
            keyframes: {
                "fade-in-down": {
                    from: {
                        transform: "translateY(-0.75rem)",
                        opacity: "0",
                    },
                    to: {
                        transform: "translateY(0rem)",
                        opacity: "1",
                    },
                },
            },
            animation: {
                "fade-in-down": "fade-in-down 0.2s ease-in-out both",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("tw-elements/dist/plugin"),
    ],
};

// const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });
