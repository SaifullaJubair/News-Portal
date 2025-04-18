/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // for news portal
        pLightColor: "#01934B",
        PDeepColor: "#1D7048",
        pHoverTextColor: "#00954C",
        pHeadingTextColor: "#1f2937",
        pTextColor: "#1f2937",
        pTextDetailsColor: "#707070",
        pHoverTextDetailsColor: "#121212",
        // for news portal

        primaryColor: "#0A0D28",
        primaryDeepColor: "#008140",
        primaryLightColor: "#00C961",
        primaryMediumLightColor: "#08B05A",

        secondary: "#F0F0F0",
        logoColor: "#FDEE9B",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#FFFFFF",
        hoverColor: "#1E2A34",
        redColor: "#f03737",
        successColor: "#3BB77E",

        secondary2: {
          DEFAULT: "#F27F21",
          light: "#ebe4f7",
          "dark-light": "rgb(128 93 202 / 15%)",
        },

        darkblack: {
          300: "#747681",
          400: "#2A313C",
          500: "#23262B",
          600: "#1D1E24",
          700: "#151515",
        },
        success: {
          50: "#D9FBE6",
          100: "#B7FFD1",
          200: "#4ADE80",
          300: "#22C55E",
          400: "#16A34A",
        },
        warning: {
          100: "#FDE047",
          200: "#FACC15",
          300: "#EAB308",
        },
        error: {
          50: "#FCDEDE",
          100: "#FF7171",
          200: "#FF4747",
          300: "#DD3333",
        },
        bgray: {
          50: "#FAFAFA",
          100: "#F7FAFC",
          200: "#EDF2F7",
          300: "#E2E8F0",
          400: "#CBD5E0",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },
        orange: "#FF784B",
        bamber: {
          50: "#FFFBEB",
          100: "#FFC837",
          500: "#F6A723",
        },
        purple: "#936DFF",
      },

      fontFamily: {
        primary: ["Manrope", "sans-serif"],
        sec: ["Nunito", "sans-serif"],
        extra: ["Pacifico", "cursive"],
      },

      transitionDuration: {
        1200: "1200ms",
        1500: "1500ms",
      },

      screens: {
        sm: "640px", // Small screens (e.g., smartphones)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops)
        xl: "1280px",
        "2xl": "1440px", // Extra-large screens (e.g., desktops)
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "5xl": "48px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
