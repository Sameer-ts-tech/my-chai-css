/**
 * Chai CSS ☕ — A lightweight utility-first CSS engine
 * Version 1.0.0
 *
 * Scans the DOM for chai-* classes and applies
 * corresponding inline styles dynamically.
 */

const cache = {};

// ========================================
// Design Tokens
// ========================================

const spacingScale = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  36: "144px",
  40: "160px",
  44: "176px",
  48: "192px",
  52: "208px",
  56: "224px",
  60: "240px",
  64: "256px",
  72: "288px",
  80: "320px",
  96: "384px",
};

const colorPalette = {
  // Neutrals
  slate: {
    50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
    400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
    800: "#1e293b", 900: "#0f172a", 950: "#020617",
  },
  gray: {
    50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db",
    400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151",
    800: "#1f2937", 900: "#111827", 950: "#030712",
  },
  zinc: {
    50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8",
    400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46",
    800: "#27272a", 900: "#18181b", 950: "#09090b",
  },
  neutral: {
    50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4",
    400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040",
    800: "#262626", 900: "#171717", 950: "#0a0a0a",
  },
  // Colors
  red: {
    50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5",
    400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c",
    800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a",
  },
  orange: {
    50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
    400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
    800: "#9a3412", 900: "#7c2d12", 950: "#431407",
  },
  amber: {
    50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d",
    400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309",
    800: "#92400e", 900: "#78350f", 950: "#451a03",
  },
  yellow: {
    50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047",
    400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207",
    800: "#854d0e", 900: "#713f12", 950: "#422006",
  },
  lime: {
    50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264",
    400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f",
    800: "#3f6212", 900: "#365314", 950: "#1a2e05",
  },
  green: {
    50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac",
    400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d",
    800: "#166534", 900: "#14532d", 950: "#052e16",
  },
  emerald: {
    50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7",
    400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857",
    800: "#065f46", 900: "#064e3b", 950: "#022c22",
  },
  teal: {
    50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4",
    400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e",
    800: "#115e59", 900: "#134e4a", 950: "#042f2e",
  },
  cyan: {
    50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9",
    400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490",
    800: "#155e75", 900: "#164e63", 950: "#083344",
  },
  sky: {
    50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc",
    400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1",
    800: "#075985", 900: "#0c4a6e", 950: "#082f49",
  },
  blue: {
    50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
    400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
    800: "#1e40af", 900: "#1e3a8a", 950: "#172554",
  },
  indigo: {
    50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc",
    400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca",
    800: "#3730a3", 900: "#312e81", 950: "#1e1b4b",
  },
  violet: {
    50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd",
    400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9",
    800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065",
  },
  purple: {
    50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe",
    400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce",
    800: "#6b21a8", 900: "#581c87", 950: "#3b0764",
  },
  fuchsia: {
    50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc",
    400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf",
    800: "#86198f", 900: "#701a75", 950: "#4a044e",
  },
  pink: {
    50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4",
    400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d",
    800: "#9d174d", 900: "#831843", 950: "#500724",
  },
  rose: {
    50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af",
    400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c",
    800: "#9f1239", 900: "#881337", 950: "#4c0519",
  },
};

const fontSizeScale = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "60px",
  "7xl": "72px",
  "8xl": "96px",
  "9xl": "128px",
};

const borderRadiusScale = {
  none: "0px",
  sm: "2px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px",
};

const shadowScale = {
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
  xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
  "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
  none: "none",
};

// ========================================
// Helper: resolve color from palette or plain name
// ========================================
function resolveColor(raw) {
  // Handle palette colors like "blue-500", "emerald-400"
  const parts = raw.split("-");
  if (parts.length === 2 && colorPalette[parts[0]] && colorPalette[parts[0]][parts[1]]) {
    return colorPalette[parts[0]][parts[1]];
  }
  // CSS named colors or hex — pass through
  if (raw.startsWith("#") || CSS.supports("color", raw)) {
    return raw;
  }
  return raw;
}

// ========================================
// Rules
// ========================================
const rules = [
  // ======================
  // Display
  // ======================
  { match: (c) => c === "flex", apply: () => ({ display: "flex" }) },
  { match: (c) => c === "grid", apply: () => ({ display: "grid" }) },
  { match: (c) => c === "block", apply: () => ({ display: "block" }) },
  { match: (c) => c === "inline-block", apply: () => ({ display: "inline-block" }) },
  { match: (c) => c === "inline", apply: () => ({ display: "inline" }) },
  { match: (c) => c === "inline-flex", apply: () => ({ display: "inline-flex" }) },
  { match: (c) => c === "inline-grid", apply: () => ({ display: "inline-grid" }) },
  { match: (c) => c === "hidden", apply: () => ({ display: "none" }) },
  { match: (c) => c === "table", apply: () => ({ display: "table" }) },

  // ======================
  // Flexbox
  // ======================
  { match: (c) => c === "flex-col", apply: () => ({ flexDirection: "column" }) },
  { match: (c) => c === "flex-row", apply: () => ({ flexDirection: "row" }) },
  { match: (c) => c === "flex-wrap", apply: () => ({ flexWrap: "wrap" }) },
  { match: (c) => c === "flex-nowrap", apply: () => ({ flexWrap: "nowrap" }) },
  { match: (c) => c === "flex-1", apply: () => ({ flex: "1 1 0%" }) },
  { match: (c) => c === "flex-auto", apply: () => ({ flex: "1 1 auto" }) },
  { match: (c) => c === "flex-none", apply: () => ({ flex: "none" }) },
  { match: (c) => c === "flex-grow", apply: () => ({ flexGrow: "1" }) },
  { match: (c) => c === "flex-shrink", apply: () => ({ flexShrink: "1" }) },
  { match: (c) => c === "flex-shrink-0", apply: () => ({ flexShrink: "0" }) },

  // Justify
  { match: (c) => c === "justify-start", apply: () => ({ justifyContent: "flex-start" }) },
  { match: (c) => c === "justify-center", apply: () => ({ justifyContent: "center" }) },
  { match: (c) => c === "justify-end", apply: () => ({ justifyContent: "flex-end" }) },
  { match: (c) => c === "justify-between", apply: () => ({ justifyContent: "space-between" }) },
  { match: (c) => c === "justify-around", apply: () => ({ justifyContent: "space-around" }) },
  { match: (c) => c === "justify-evenly", apply: () => ({ justifyContent: "space-evenly" }) },

  // Align Items
  { match: (c) => c === "items-start", apply: () => ({ alignItems: "flex-start" }) },
  { match: (c) => c === "items-center", apply: () => ({ alignItems: "center" }) },
  { match: (c) => c === "items-end", apply: () => ({ alignItems: "flex-end" }) },
  { match: (c) => c === "items-stretch", apply: () => ({ alignItems: "stretch" }) },
  { match: (c) => c === "items-baseline", apply: () => ({ alignItems: "baseline" }) },

  // Align Self
  { match: (c) => c === "self-auto", apply: () => ({ alignSelf: "auto" }) },
  { match: (c) => c === "self-start", apply: () => ({ alignSelf: "flex-start" }) },
  { match: (c) => c === "self-center", apply: () => ({ alignSelf: "center" }) },
  { match: (c) => c === "self-end", apply: () => ({ alignSelf: "flex-end" }) },
  { match: (c) => c === "self-stretch", apply: () => ({ alignSelf: "stretch" }) },

  // Gap
  {
    match: (c) => c.startsWith("gap-"),
    apply: (c) => {
      const v = c.split("-")[1];
      return { gap: spacingScale[v] || v + "px" };
    },
  },

  // ======================
  // Grid
  // ======================
  {
    match: (c) => /^grid-cols-\d+$/.test(c),
    apply: (c) => {
      const n = c.split("-")[2];
      return { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` };
    },
  },
  {
    match: (c) => /^col-span-\d+$/.test(c),
    apply: (c) => {
      const n = c.split("-")[2];
      return { gridColumn: `span ${n} / span ${n}` };
    },
  },

  // ======================
  // Spacing (Padding)
  // ======================
  {
    match: (c) => /^p[trblxy]?-[\d.]+$/.test(c),
    apply: (c) => {
      const [prop, val] = c.split("-");
      const size = spacingScale[val] || val + "px";
      const map = {
        p: ["padding"],
        px: ["paddingLeft", "paddingRight"],
        py: ["paddingTop", "paddingBottom"],
        pt: ["paddingTop"],
        pb: ["paddingBottom"],
        pl: ["paddingLeft"],
        pr: ["paddingRight"],
      };
      const style = {};
      (map[prop] || []).forEach((key) => (style[key] = size));
      return style;
    },
  },

  // ======================
  // Spacing (Margin)
  // ======================
  {
    match: (c) => /^m[trblxy]?-[\d.]+$/.test(c),
    apply: (c) => {
      const [prop, val] = c.split("-");
      const size = spacingScale[val] || val + "px";
      const map = {
        m: ["margin"],
        mx: ["marginLeft", "marginRight"],
        my: ["marginTop", "marginBottom"],
        mt: ["marginTop"],
        mb: ["marginBottom"],
        ml: ["marginLeft"],
        mr: ["marginRight"],
      };
      const style = {};
      (map[prop] || []).forEach((key) => (style[key] = size));
      return style;
    },
  },
  { match: (c) => c === "mx-auto", apply: () => ({ marginLeft: "auto", marginRight: "auto" }) },

  // ======================
  // Background Color
  // ======================
  {
    match: (c) => /^bg-/.test(c),
    apply: (c) => {
      const raw = c.replace("bg-", "");
      if (raw === "transparent") return { backgroundColor: "transparent" };
      return { backgroundColor: resolveColor(raw) };
    },
  },

  // ======================
  // Text (color, size, align)
  // ======================
  {
    match: (c) => /^text-/.test(c),
    apply: (c) => {
      const val = c.replace("text-", "");

      // Alignment
      if (["center", "left", "right", "justify"].includes(val)) {
        return { textAlign: val };
      }

      // Named font size scale
      if (fontSizeScale[val]) {
        return { fontSize: fontSizeScale[val] };
      }

      // Pixel size
      if (/^\d+$/.test(val)) return { fontSize: val + "px" };

      // Color (with palette support)
      return { color: resolveColor(val) };
    },
  },

  // ======================
  // Typography
  // ======================
  { match: (c) => c === "font-thin", apply: () => ({ fontWeight: "100" }) },
  { match: (c) => c === "font-extralight", apply: () => ({ fontWeight: "200" }) },
  { match: (c) => c === "font-light", apply: () => ({ fontWeight: "300" }) },
  { match: (c) => c === "font-normal", apply: () => ({ fontWeight: "400" }) },
  { match: (c) => c === "font-medium", apply: () => ({ fontWeight: "500" }) },
  { match: (c) => c === "font-semibold", apply: () => ({ fontWeight: "600" }) },
  { match: (c) => c === "font-bold", apply: () => ({ fontWeight: "700" }) },
  { match: (c) => c === "font-extrabold", apply: () => ({ fontWeight: "800" }) },
  { match: (c) => c === "font-black", apply: () => ({ fontWeight: "900" }) },

  { match: (c) => c === "italic", apply: () => ({ fontStyle: "italic" }) },
  { match: (c) => c === "not-italic", apply: () => ({ fontStyle: "normal" }) },

  { match: (c) => c === "uppercase", apply: () => ({ textTransform: "uppercase" }) },
  { match: (c) => c === "lowercase", apply: () => ({ textTransform: "lowercase" }) },
  { match: (c) => c === "capitalize", apply: () => ({ textTransform: "capitalize" }) },
  { match: (c) => c === "normal-case", apply: () => ({ textTransform: "none" }) },

  { match: (c) => c === "underline", apply: () => ({ textDecoration: "underline" }) },
  { match: (c) => c === "line-through", apply: () => ({ textDecoration: "line-through" }) },
  { match: (c) => c === "no-underline", apply: () => ({ textDecoration: "none" }) },

  { match: (c) => c === "leading-none", apply: () => ({ lineHeight: "1" }) },
  { match: (c) => c === "leading-tight", apply: () => ({ lineHeight: "1.25" }) },
  { match: (c) => c === "leading-snug", apply: () => ({ lineHeight: "1.375" }) },
  { match: (c) => c === "leading-normal", apply: () => ({ lineHeight: "1.5" }) },
  { match: (c) => c === "leading-relaxed", apply: () => ({ lineHeight: "1.625" }) },
  { match: (c) => c === "leading-loose", apply: () => ({ lineHeight: "2" }) },

  { match: (c) => c === "tracking-tighter", apply: () => ({ letterSpacing: "-0.05em" }) },
  { match: (c) => c === "tracking-tight", apply: () => ({ letterSpacing: "-0.025em" }) },
  { match: (c) => c === "tracking-normal", apply: () => ({ letterSpacing: "0em" }) },
  { match: (c) => c === "tracking-wide", apply: () => ({ letterSpacing: "0.025em" }) },
  { match: (c) => c === "tracking-wider", apply: () => ({ letterSpacing: "0.05em" }) },
  { match: (c) => c === "tracking-widest", apply: () => ({ letterSpacing: "0.1em" }) },

  // ======================
  // Width & Height
  // ======================
  {
    match: (c) => /^w-/.test(c),
    apply: (c) => {
      const val = c.replace("w-", "");
      const map = {
        full: "100%",
        screen: "100vw",
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      };
      if (map[val]) return { width: map[val] };
      if (spacingScale[val]) return { width: spacingScale[val] };
      return { width: val + "px" };
    },
  },
  {
    match: (c) => /^h-/.test(c),
    apply: (c) => {
      const val = c.replace("h-", "");
      const map = {
        full: "100%",
        screen: "100vh",
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      };
      if (map[val]) return { height: map[val] };
      if (spacingScale[val]) return { height: spacingScale[val] };
      return { height: val + "px" };
    },
  },
  {
    match: (c) => /^min-w-/.test(c),
    apply: (c) => {
      const val = c.replace("min-w-", "");
      return { minWidth: val === "0" ? "0px" : val === "full" ? "100%" : val + "px" };
    },
  },
  {
    match: (c) => /^min-h-/.test(c),
    apply: (c) => {
      const val = c.replace("min-h-", "");
      return { minHeight: val === "0" ? "0px" : val === "full" ? "100%" : val === "screen" ? "100vh" : val + "px" };
    },
  },
  {
    match: (c) => /^max-w-/.test(c),
    apply: (c) => {
      const val = c.replace("max-w-", "");
      const map = {
        xs: "320px", sm: "384px", md: "448px", lg: "512px", xl: "576px",
        "2xl": "672px", "3xl": "768px", "4xl": "896px", "5xl": "1024px",
        "6xl": "1152px", "7xl": "1280px", full: "100%", none: "none",
        screen: "100vw",
      };
      return { maxWidth: map[val] || val + "px" };
    },
  },
  {
    match: (c) => /^max-h-/.test(c),
    apply: (c) => {
      const val = c.replace("max-h-", "");
      return { maxHeight: val === "full" ? "100%" : val === "screen" ? "100vh" : val + "px" };
    },
  },

  // ======================
  // Border & Radius
  // ======================
  { match: (c) => c === "border", apply: () => ({ border: "1px solid currentColor" }) },
  {
    match: (c) => /^border-\d+$/.test(c),
    apply: (c) => ({ border: `${c.split("-")[1]}px solid currentColor` }),
  },
  { match: (c) => c === "border-t", apply: () => ({ borderTop: "1px solid currentColor" }) },
  { match: (c) => c === "border-r", apply: () => ({ borderRight: "1px solid currentColor" }) },
  { match: (c) => c === "border-b", apply: () => ({ borderBottom: "1px solid currentColor" }) },
  { match: (c) => c === "border-l", apply: () => ({ borderLeft: "1px solid currentColor" }) },
  { match: (c) => c === "border-none", apply: () => ({ border: "none" }) },
  {
    match: (c) => /^border-(?!t$|r$|b$|l$|none$|\d+$)[a-z]/.test(c),
    apply: (c) => {
      const raw = c.replace("border-", "");
      return { borderColor: resolveColor(raw) };
    },
  },

  // Rounded
  {
    match: (c) => /^rounded/.test(c),
    apply: (c) => {
      const val = c.replace("rounded-", "").replace("rounded", "");
      if (!val || val === "") return { borderRadius: "6px" };
      if (borderRadiusScale[val]) return { borderRadius: borderRadiusScale[val] };
      return { borderRadius: val + "px" };
    },
  },

  // ======================
  // Position
  // ======================
  { match: (c) => c === "relative", apply: () => ({ position: "relative" }) },
  { match: (c) => c === "absolute", apply: () => ({ position: "absolute" }) },
  { match: (c) => c === "fixed", apply: () => ({ position: "fixed" }) },
  { match: (c) => c === "sticky", apply: () => ({ position: "sticky" }) },
  { match: (c) => c === "static", apply: () => ({ position: "static" }) },

  { match: (c) => c === "inset-0", apply: () => ({ top: "0", right: "0", bottom: "0", left: "0" }) },
  {
    match: (c) => /^top-/.test(c),
    apply: (c) => {
      const val = c.replace("top-", "");
      return { top: spacingScale[val] || val + "px" };
    },
  },
  {
    match: (c) => /^right-/.test(c),
    apply: (c) => {
      const val = c.replace("right-", "");
      return { right: spacingScale[val] || val + "px" };
    },
  },
  {
    match: (c) => /^bottom-/.test(c),
    apply: (c) => {
      const val = c.replace("bottom-", "");
      return { bottom: spacingScale[val] || val + "px" };
    },
  },
  {
    match: (c) => /^left-/.test(c),
    apply: (c) => {
      const val = c.replace("left-", "");
      return { left: spacingScale[val] || val + "px" };
    },
  },

  // Z-Index
  {
    match: (c) => /^z-/.test(c),
    apply: (c) => {
      const val = c.replace("z-", "");
      return { zIndex: val };
    },
  },

  // ======================
  // Shadow
  // ======================
  {
    match: (c) => /^shadow/.test(c),
    apply: (c) => {
      const val = c.replace("shadow-", "").replace("shadow", "");
      if (!val || val === "") return { boxShadow: shadowScale.DEFAULT };
      return { boxShadow: shadowScale[val] || shadowScale.DEFAULT };
    },
  },

  // ======================
  // Opacity
  // ======================
  {
    match: (c) => /^opacity-\d+$/.test(c),
    apply: (c) => {
      const val = parseInt(c.split("-")[1], 10);
      return { opacity: String(val / 100) };
    },
  },

  // ======================
  // Overflow
  // ======================
  { match: (c) => c === "overflow-hidden", apply: () => ({ overflow: "hidden" }) },
  { match: (c) => c === "overflow-auto", apply: () => ({ overflow: "auto" }) },
  { match: (c) => c === "overflow-scroll", apply: () => ({ overflow: "scroll" }) },
  { match: (c) => c === "overflow-visible", apply: () => ({ overflow: "visible" }) },
  { match: (c) => c === "overflow-x-auto", apply: () => ({ overflowX: "auto" }) },
  { match: (c) => c === "overflow-y-auto", apply: () => ({ overflowY: "auto" }) },
  { match: (c) => c === "overflow-x-hidden", apply: () => ({ overflowX: "hidden" }) },
  { match: (c) => c === "overflow-y-hidden", apply: () => ({ overflowY: "hidden" }) },

  // ======================
  // Cursor
  // ======================
  { match: (c) => c === "cursor-pointer", apply: () => ({ cursor: "pointer" }) },
  { match: (c) => c === "cursor-default", apply: () => ({ cursor: "default" }) },
  { match: (c) => c === "cursor-not-allowed", apply: () => ({ cursor: "not-allowed" }) },
  { match: (c) => c === "cursor-grab", apply: () => ({ cursor: "grab" }) },
  { match: (c) => c === "cursor-text", apply: () => ({ cursor: "text" }) },

  // ======================
  // Transitions
  // ======================
  { match: (c) => c === "transition", apply: () => ({ transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)" }) },
  { match: (c) => c === "transition-none", apply: () => ({ transition: "none" }) },
  { match: (c) => c === "transition-colors", apply: () => ({ transition: "color, background-color, border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)" }) },
  { match: (c) => c === "transition-transform", apply: () => ({ transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)" }) },
  { match: (c) => c === "transition-opacity", apply: () => ({ transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)" }) },
  { match: (c) => c === "transition-shadow", apply: () => ({ transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)" }) },
  {
    match: (c) => /^duration-\d+$/.test(c),
    apply: (c) => ({ transitionDuration: c.split("-")[1] + "ms" }),
  },
  { match: (c) => c === "ease-linear", apply: () => ({ transitionTimingFunction: "linear" }) },
  { match: (c) => c === "ease-in", apply: () => ({ transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)" }) },
  { match: (c) => c === "ease-out", apply: () => ({ transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" }) },
  { match: (c) => c === "ease-in-out", apply: () => ({ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }) },

  // ======================
  // Transform
  // ======================
  {
    match: (c) => /^scale-\d+$/.test(c),
    apply: (c) => {
      const val = parseInt(c.split("-")[1], 10);
      return { transform: `scale(${val / 100})` };
    },
  },
  {
    match: (c) => /^rotate-\d+$/.test(c),
    apply: (c) => ({ transform: `rotate(${c.split("-")[1]}deg)` }),
  },

  // ======================
  // Object Fit
  // ======================
  { match: (c) => c === "object-cover", apply: () => ({ objectFit: "cover" }) },
  { match: (c) => c === "object-contain", apply: () => ({ objectFit: "contain" }) },
  { match: (c) => c === "object-fill", apply: () => ({ objectFit: "fill" }) },
  { match: (c) => c === "object-none", apply: () => ({ objectFit: "none" }) },

  // ======================
  // List Style
  // ======================
  { match: (c) => c === "list-none", apply: () => ({ listStyle: "none" }) },
  { match: (c) => c === "list-disc", apply: () => ({ listStyle: "disc" }) },
  { match: (c) => c === "list-decimal", apply: () => ({ listStyle: "decimal" }) },

  // ======================
  // Whitespace & Text Overflow
  // ======================
  { match: (c) => c === "whitespace-nowrap", apply: () => ({ whiteSpace: "nowrap" }) },
  { match: (c) => c === "whitespace-pre", apply: () => ({ whiteSpace: "pre" }) },
  { match: (c) => c === "whitespace-pre-wrap", apply: () => ({ whiteSpace: "pre-wrap" }) },
  { match: (c) => c === "whitespace-normal", apply: () => ({ whiteSpace: "normal" }) },
  {
    match: (c) => c === "truncate",
    apply: () => ({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
  },

  // ======================
  // User Select & Pointer Events
  // ======================
  { match: (c) => c === "select-none", apply: () => ({ userSelect: "none" }) },
  { match: (c) => c === "select-text", apply: () => ({ userSelect: "text" }) },
  { match: (c) => c === "select-all", apply: () => ({ userSelect: "all" }) },
  { match: (c) => c === "pointer-events-none", apply: () => ({ pointerEvents: "none" }) },
  { match: (c) => c === "pointer-events-auto", apply: () => ({ pointerEvents: "auto" }) },

  // ======================
  // Appearance & Outline
  // ======================
  { match: (c) => c === "outline-none", apply: () => ({ outline: "none" }) },
  { match: (c) => c === "appearance-none", apply: () => ({ appearance: "none" }) },
  { match: (c) => c === "resize-none", apply: () => ({ resize: "none" }) },

  // ======================
  // Background
  // ======================
  {
    match: (c) => c === "bg-gradient-to-r",
    apply: () => ({ backgroundImage: "linear-gradient(to right, var(--chai-gradient-from, transparent), var(--chai-gradient-to, transparent))" }),
  },
  {
    match: (c) => c === "bg-gradient-to-b",
    apply: () => ({ backgroundImage: "linear-gradient(to bottom, var(--chai-gradient-from, transparent), var(--chai-gradient-to, transparent))" }),
  },
  {
    match: (c) => c === "bg-gradient-to-br",
    apply: () => ({ backgroundImage: "linear-gradient(to bottom right, var(--chai-gradient-from, transparent), var(--chai-gradient-to, transparent))" }),
  },
];

// ========================================
// Core Engine
// ========================================

function generateStyle(cls) {
  if (cache[cls]) return cache[cls];

  let finalStyle = {};

  for (let rule of rules) {
    if (rule.match(cls)) {
      Object.assign(finalStyle, rule.apply(cls));
    }
  }

  cache[cls] = finalStyle;
  return finalStyle;
}

function applyChai() {
  const elements = document.querySelectorAll('[class*="chai-"]');

  elements.forEach((el) => {
    const classList = el.className.split(" ");
    let finalStyle = {};

    classList.forEach((cls) => {
      if (!cls.startsWith("chai-")) return;

      const pureClass = cls.replace("chai-", "");
      const style = generateStyle(pureClass);

      Object.assign(finalStyle, style);
    });

    Object.assign(el.style, finalStyle);
  });
}

function observeDOM() {
  const observer = new MutationObserver(() => {
    applyChai();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}

function initChai() {
  applyChai();
  observeDOM();
}

// Auto-init when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChai);
} else {
  initChai();
}

// Export for npm / module environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initChai, applyChai };
}