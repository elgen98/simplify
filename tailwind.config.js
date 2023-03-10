/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./public/index.html"],
    theme: {
        extend: {
            screens: {
                "3xl": "2560px",
                "4xl": "3750px",
            },
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
                slidingElement: "slideFromLeft 0.2s ease-out",
            },
            colors: {
                "nice-gray": "#A0B9D9",
                "nice-yellow": "#F2B705",
                "nice-orange": "#F29F05",
                "nice-blue": "#0378A6",
            },
            inset: {
                "85%": "85%",
                "60%": "60%",
                "55%": "55%",
                "20%": "20%",
                "15%": "15%",
            },
            dropShadow: {
                blueText: "1px 1px 1px rgba(3,120,166,1.000)",
            },
        },
    },

    plugins: [],
};
