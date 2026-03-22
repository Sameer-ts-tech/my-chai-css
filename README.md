# ☕ Chai CSS

A **lightweight, zero-dependency utility-first CSS engine** that scans your DOM for `chai-*` classes and applies styles dynamically. No build step. No configuration. Just classes.

---

## ⚡ Quick Start

### npm

```bash
npm install chai-css
```

Then in your JS entry file:

```js
require('chai-css');
```

### CDN / Script Tag

```html
<script src="https://unpkg.com/chai-css"></script>
```

Or include the file directly:

```html
<script src="chai.js"></script>
```

---

## 🛠️ Usage

Add `chai-` prefixed utility classes to any HTML element:

```html
<div class="chai-flex chai-gap-4 chai-p-8 chai-bg-blue-500 chai-text-white chai-rounded-xl chai-shadow-lg">
  <h2 class="chai-text-2xl chai-font-bold">Hello Chai! ☕</h2>
  <p class="chai-text-sm chai-text-blue-100">Styled with utility classes.</p>
</div>
```

---

## 📖 Available Utilities

### Display
`chai-flex` · `chai-grid` · `chai-block` · `chai-inline-block` · `chai-inline` · `chai-inline-flex` · `chai-hidden`

### Flexbox
`chai-flex-row` · `chai-flex-col` · `chai-flex-wrap` · `chai-flex-1` · `chai-flex-none` · `chai-flex-grow` · `chai-flex-shrink`

`chai-justify-start` · `chai-justify-center` · `chai-justify-end` · `chai-justify-between` · `chai-justify-around` · `chai-justify-evenly`

`chai-items-start` · `chai-items-center` · `chai-items-end` · `chai-items-stretch` · `chai-items-baseline`

`chai-gap-{n}`

### Grid
`chai-grid-cols-{1-12}` · `chai-col-span-{n}`

### Spacing
`chai-p-{n}` · `chai-px-{n}` · `chai-py-{n}` · `chai-pt-{n}` · `chai-pr-{n}` · `chai-pb-{n}` · `chai-pl-{n}`

`chai-m-{n}` · `chai-mx-{n}` · `chai-my-{n}` · `chai-mt-{n}` · `chai-mr-{n}` · `chai-mb-{n}` · `chai-ml-{n}` · `chai-mx-auto`

Scale: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

### Typography
`chai-text-xs` · `chai-text-sm` · `chai-text-base` · `chai-text-lg` · `chai-text-xl` · `chai-text-2xl` … `chai-text-9xl` · `chai-text-{n}` (px)

`chai-font-thin` · `chai-font-light` · `chai-font-normal` · `chai-font-medium` · `chai-font-semibold` · `chai-font-bold` · `chai-font-extrabold` · `chai-font-black`

`chai-italic` · `chai-uppercase` · `chai-lowercase` · `chai-capitalize` · `chai-underline` · `chai-line-through`

`chai-text-center` · `chai-text-left` · `chai-text-right` · `chai-text-justify`

`chai-leading-none` · `chai-leading-tight` · `chai-leading-normal` · `chai-leading-relaxed` · `chai-leading-loose`

`chai-tracking-tight` · `chai-tracking-normal` · `chai-tracking-wide` · `chai-tracking-widest`

### Colors
20 color families: **slate**, **gray**, **zinc**, **neutral**, **red**, **orange**, **amber**, **yellow**, **lime**, **green**, **emerald**, **teal**, **cyan**, **sky**, **blue**, **indigo**, **violet**, **purple**, **fuchsia**, **pink**, **rose**

Each with shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

Usage: `chai-bg-blue-500` · `chai-text-emerald-400` · `chai-border-red-600`

### Width & Height
`chai-w-{n}` · `chai-w-full` · `chai-w-screen` · `chai-w-auto`

`chai-h-{n}` · `chai-h-full` · `chai-h-screen` · `chai-h-auto`

`chai-max-w-{xs|sm|md|lg|xl|2xl|…|7xl|full|none}` · `chai-min-h-screen`

### Border & Radius
`chai-border` · `chai-border-{n}` · `chai-border-t` · `chai-border-r` · `chai-border-b` · `chai-border-l` · `chai-border-none`

`chai-rounded` · `chai-rounded-sm` · `chai-rounded-md` · `chai-rounded-lg` · `chai-rounded-xl` · `chai-rounded-2xl` · `chai-rounded-full` · `chai-rounded-none`

### Shadows
`chai-shadow-sm` · `chai-shadow` · `chai-shadow-md` · `chai-shadow-lg` · `chai-shadow-xl` · `chai-shadow-2xl` · `chai-shadow-none`

### Position
`chai-relative` · `chai-absolute` · `chai-fixed` · `chai-sticky` · `chai-static`

`chai-top-{n}` · `chai-right-{n}` · `chai-bottom-{n}` · `chai-left-{n}` · `chai-inset-0` · `chai-z-{n}`

### Opacity
`chai-opacity-{0|25|50|75|100}`

### Overflow
`chai-overflow-hidden` · `chai-overflow-auto` · `chai-overflow-scroll` · `chai-overflow-visible`

### Cursor
`chai-cursor-pointer` · `chai-cursor-default` · `chai-cursor-not-allowed` · `chai-cursor-grab`

### Transitions
`chai-transition` · `chai-transition-colors` · `chai-transition-transform` · `chai-transition-opacity`

`chai-duration-{ms}` · `chai-ease-linear` · `chai-ease-in` · `chai-ease-out` · `chai-ease-in-out`

### Transform
`chai-scale-{n}` · `chai-rotate-{n}`

### Misc
`chai-select-none` · `chai-truncate` · `chai-whitespace-nowrap` · `chai-list-none` · `chai-object-cover` · `chai-object-contain`

---

## 💡 How It Works

1. Scans DOM for elements with `chai-*` classes
2. Parses each class against utility rules
3. Generates + caches inline styles
4. Applies styles via `element.style`
5. Watches for DOM mutations to auto-style new elements

---

## 📄 License

MIT — use it, fork it, brew it. ☕
