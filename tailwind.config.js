/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./public/index.html"],
    theme: {
        extend: {
            keyframes: {
                slideFromLeft: {
                    "0%": {
                        transform: "translateX(-100%)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
            },
            animation: {
                slidingElement: "slideFromLeft 0.1s linear",
            },
            colors: {
                "nice-gray": "#A0B9D9",
                "nice-yellow": "#F2B705",
            },
        },
    },

    plugins: [],
};
