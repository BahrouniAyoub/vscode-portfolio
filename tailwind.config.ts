import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      lineHeight: {
        none: '1',
        tight: '1.2',
        snug: '1.3',
        normal: '1.4',
        relaxed: '1.4',
        loose: '1.5',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        normal: '-0.02em',
        wide: '-0.01em',
        wider: '0em',
        widest: '0.05em',
      },
      fontFamily: {
        code: ["'Fira Code'", "Consolas", "'Courier New'", "monospace"],
        ui: ["'Segoe UI'", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        vsc: {
          bg: "hsl(var(--vsc-bg))",
          editor: "hsl(var(--vsc-editor-bg))",
          sidebar: "hsl(var(--vsc-sidebar-bg))",
          titlebar: "hsl(var(--vsc-titlebar-bg))",
          activitybar: "hsl(var(--vsc-activitybar-bg))",
          statusbar: "hsl(var(--vsc-statusbar-bg))",
          "tab-active": "hsl(var(--vsc-tab-active-bg))",
          "tab-inactive": "hsl(var(--vsc-tab-inactive-bg))",
          "tab-border": "hsl(var(--vsc-tab-border))",
          selection: "hsl(var(--vsc-selection))",
          "line-number": "hsl(var(--vsc-line-number))",
          comment: "hsl(var(--vsc-comment))",
          keyword: "hsl(var(--vsc-keyword))",
          string: "hsl(var(--vsc-string))",
          function: "hsl(var(--vsc-function))",
          type: "hsl(var(--vsc-type))",
          green: "hsl(var(--vsc-green))",
          cyan: "hsl(var(--vsc-cyan))",
          pink: "hsl(var(--vsc-pink))",
          orange: "hsl(var(--vsc-orange))",
          yellow: "hsl(var(--vsc-yellow))",
          red: "hsl(var(--vsc-red))",
        },
        vscode: {
          gcm: "var(--green)",
          bright: "var(--bright)",
          dim: "var(--dim)",
          blue: "var(--blue)",
          border: "var(--border-menu)",
          blue2: "var(--blue2)",
          pink: "hsl(var(--vsc-pink))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
