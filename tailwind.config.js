import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
    "light": {
      "colors": {
        "default": {
          "50": "#f6f5f4",
          "100": "#e9e7e5",
          "200": "#dbd9d6",
          "300": "#cecbc6",
          "400": "#c1bdb7",
          "500": "#b4afa8",
          "600": "#95908b",
          "700": "#75726d",
          "800": "#565350",
          "900": "#363532",
          "foreground": "#000",
          "DEFAULT": "#b4afa8"
        },
        "primary": {
          "50": "#fbf1e9",
          "100": "#f4dec9",
          "200": "#eecbaa",
          "300": "#e8b88a",
          "400": "#e1a56b",
          "500": "#db924b",
          "600": "#b5783e",
          "700": "#8e5f31",
          "800": "#684524",
          "900": "#422c17",
          "foreground": "#000",
          "DEFAULT": "#db924b"
        },
        "secondary": {
          "50": "#eaf0f0",
          "100": "#cedadb",
          "200": "#b1c5c6",
          "300": "#94afb0",
          "400": "#779a9b",
          "500": "#5a8486",
          "600": "#4a6d6f",
          "700": "#3b5657",
          "800": "#2b3f40",
          "900": "#1b2828",
          "foreground": "#000",
          "DEFAULT": "#5a8486"
        },
        "success": {
          "50": "#f3f6f0",
          "100": "#e2e9db",
          "200": "#d0ddc6",
          "300": "#bfd0b1",
          "400": "#aec49c",
          "500": "#9db787",
          "600": "#82976f",
          "700": "#667758",
          "800": "#4b5740",
          "900": "#2f3729",
          "foreground": "#000",
          "DEFAULT": "#9db787"
        },
        "warning": {
          "50": "#fff9eb",
          "100": "#fff2cf",
          "200": "#ffeab3",
          "300": "#ffe297",
          "400": "#ffda7b",
          "500": "#ffd25f",
          "600": "#d2ad4e",
          "700": "#a6893e",
          "800": "#79642d",
          "900": "#4d3f1d",
          "foreground": "#000",
          "DEFAULT": "#ffd25f"
        },
        "danger": {
          "50": "#fff2ef",
          "100": "#fedfd9",
          "200": "#fecdc3",
          "300": "#fdbaad",
          "400": "#fda897",
          "500": "#fc9581",
          "600": "#d07b6a",
          "700": "#a46154",
          "800": "#78473d",
          "900": "#4c2d27",
          "foreground": "#000",
          "DEFAULT": "#fc9581"
        },
        "background": "#fffbf6",
        "foreground": {
          "50": "#f3ede4",
          "100": "#e3d5be",
          "200": "#d3bc97",
          "300": "#c3a371",
          "400": "#b28b4b",
          "500": "#a27225",
          "600": "#865e1f",
          "700": "#694a18",
          "800": "#4d3612",
          "900": "#31220b",
          "foreground": "#000",
          "DEFAULT": "#a27225"
        },
        "content1": {
          "DEFAULT": "#fff2e0",
          "foreground": "#000"
        },
        "content2": {
          "DEFAULT": "#ffe9cc",
          "foreground": "#000"
        },
        "content3": {
          "DEFAULT": "#ffe0b8",
          "foreground": "#000"
        },
        "content4": {
          "DEFAULT": "#ffd7a3",
          "foreground": "#000"
        },
        "focus": "#db924b",
        "overlay": "#000000",
        "divider": "#111111"
      }
    },
    "dark": {
      "colors": {
        "default": {
          "50": "#141114",
          "100": "#1f1b1f",
          "200": "#2a242a",
          "300": "#362e36",
          "400": "#413841",
          "500": "#625b62",
          "600": "#847e84",
          "700": "#a5a0a5",
          "800": "#c6c3c6",
          "900": "#e7e6e7",
          "foreground": "#fff",
          "DEFAULT": "#413841"
        },
        "primary": {
          "50": "#422c17",
          "100": "#684524",
          "200": "#8e5f31",
          "300": "#b5783e",
          "400": "#db924b",
          "500": "#e1a56b",
          "600": "#e8b88a",
          "700": "#eecbaa",
          "800": "#f4dec9",
          "900": "#fbf1e9",
          "foreground": "#000",
          "DEFAULT": "#db924b"
        },
        "secondary": {
          "50": "#1b2828",
          "100": "#2b3f40",
          "200": "#3b5657",
          "300": "#4a6d6f",
          "400": "#5a8486",
          "500": "#779a9b",
          "600": "#94afb0",
          "700": "#b1c5c6",
          "800": "#cedadb",
          "900": "#eaf0f0",
          "foreground": "#000",
          "DEFAULT": "#5a8486"
        },
        "success": {
          "50": "#2f3729",
          "100": "#4b5740",
          "200": "#667758",
          "300": "#82976f",
          "400": "#9db787",
          "500": "#aec49c",
          "600": "#bfd0b1",
          "700": "#d0ddc6",
          "800": "#e2e9db",
          "900": "#f3f6f0",
          "foreground": "#000",
          "DEFAULT": "#9db787"
        },
        "warning": {
          "50": "#4d3f1d",
          "100": "#79642d",
          "200": "#a6893e",
          "300": "#d2ad4e",
          "400": "#ffd25f",
          "500": "#ffda7b",
          "600": "#ffe297",
          "700": "#ffeab3",
          "800": "#fff2cf",
          "900": "#fff9eb",
          "foreground": "#000",
          "DEFAULT": "#ffd25f"
        },
        "danger": {
          "50": "#4c2d27",
          "100": "#78473d",
          "200": "#a46154",
          "300": "#d07b6a",
          "400": "#fc9581",
          "500": "#fda897",
          "600": "#fdbaad",
          "700": "#fecdc3",
          "800": "#fedfd9",
          "900": "#fff2ef",
          "foreground": "#000",
          "DEFAULT": "#fc9581"
        },
        "background": "#222222",
        "foreground": {
          "50": "#3b301d",
          "100": "#5e4c2e",
          "200": "#80673e",
          "300": "#a3834f",
          "400": "#c59f60",
          "500": "#cfb07c",
          "600": "#d9c198",
          "700": "#e3d1b3",
          "800": "#eee2cf",
          "900": "#f8f3eb",
          "foreground": "#000",
          "DEFAULT": "#c59f60"
        },
        "content1": {
          "DEFAULT": "#2c1f2b",
          "foreground": "#fff"
        },
        "content2": {
          "DEFAULT": "#3e2b3c",
          "foreground": "#fff"
        },
        "content3": {
          "DEFAULT": "#50374d",
          "foreground": "#fff"
        },
        "content4": {
          "DEFAULT": "#62435f",
          "foreground": "#fff"
        },
        "focus": "#db924b",
        "overlay": "#ffffff",
        "divider": "#ffffff"
      }
    }
  },
  "layout": {
    "fontSize": {
      "tiny": "0.75rem",
      "small": "0.875rem",
      "medium": "1rem",
      "large": "1.125rem"
    },
    "lineHeight": {
      "tiny": "1rem",
      "small": "1.25rem",
      "medium": "1.5rem",
      "large": "1.75rem"
    },
    "radius": {
      "small": "0.5rem",
      "medium": "0.75rem",
      "large": "0.875rem"
    },
    "borderWidth": {
      "small": "1px",
      "medium": "2px",
      "large": "3px"
    },
    "disabledOpacity": "0.5",
    "dividerWeight": "1",
    "hoverOpacity": "0.9"
  }

    })
  ],
};





{
  }