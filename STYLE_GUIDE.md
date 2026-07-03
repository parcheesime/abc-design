# ABC Design Website Style Guide

> This document defines the visual design system for ABC Design.
> Engineering standards, coding conventions, and AI contributor guidance are maintained separately in `AGENTS.md`.

**Design Direction v1.0**

---

# Brand

## Brand Personality

ABC Design should feel like a seasoned professional—not flashy, trendy, or corporate.

The design should communicate:

- Experience
- Trust
- Simplicity
- Clarity
- Precision
- Confidence
- Calm professionalism

A client visiting the site should immediately think:

> "This looks like someone who has done this hundreds of times."

The website should never feel busy or overwhelming. Every element should have a purpose.

---

## Visual Inspiration

Think somewhere between:

- Modern architecture firm
- High-end engineering company
- Professional design studio

Avoid:

- Construction company
- Realtor
- Home improvement contractor

---

# Design Principles

1. Keep it simple.
2. Let the work speak.
3. Emphasize guidance.
4. Build trust through clarity.
5. Design for longevity.

---

# Overall Theme

> **Experienced Guidance. Thoughtful Design. Clear Process.**

---

# Design System

## Color Palette

### Primary

| Color | Hex | Usage |
|--------|-----|-------|
| Warm White | `#FAF9F7` | Primary background |
| Charcoal | `#222222` | Headlines |
| Slate Gray | `#555E68` | Body copy |
| Blueprint Blue | `#355E8C` | Accent color |
| Light Stone | `#E7E4DF` | Borders & cards |

### Secondary

| Color | Hex | Usage |
|--------|-----|-------|
| Mist Gray | `#F4F5F4` | Alternate sections |
| Concrete | `#D7D3CE` | Dividers |
| Dark Slate | `#37404A` | Footer |

### Accent Philosophy

Blueprint Blue should be used sparingly.

Use for:

- Buttons
- Links
- Icons
- Small accents
- Divider lines

Avoid large blue sections.

Photography should provide the visual interest.

---

# Typography

| Element | Font | Weight |
|---------|------|--------|
| Logo | IBM Plex Sans | 600 |
| Navigation | Inter | 500 |
| H1 | Cormorant Garamond | 600 |
| H2 | Cormorant Garamond | 600 |
| H3 | Cormorant Garamond | 500 |
| Body | Inter | 400 |
| Buttons | Inter | 500 |
| Cards | Inter | 400 |
| Captions | Inter | 400 |
| Testimonials | Cormorant Garamond Italic | 500 |

### Typography Rules

- Use `text-wrap: pretty` for body copy, lead text, paragraphs, list items, and card text.
- Maintain generous line height (1.6–1.8).
- Preserve a calm, architectural feel.

---

# Responsive Typography

- Never use `clamp()` for H1–H6.
- Use media queries for heading sizes.
- Use `clamp()` only for:
  - body text
  - lead text
  - captions
  - spacing
  - gaps
  - margins
  - padding

Do not use `clamp()` for:

- hero height
- cards
- images
- structural layout

---

# Spacing Scale

```
4
8
12
16
24
32
48
64
96
128
```

---

# Border Radius

| Element | Radius |
|----------|--------|
| Buttons | 6px |
| Inputs | 6px |
| Cards | 8px |
| Images | 8px (optional) |

---

# Container Widths

| Type | Width |
|------|------:|
| Standard | 1120px |
| Narrow Reading | 720px |
| Wide Images | 1400px |

---

# Breakpoints

| Viewport | Width |
|----------|------:|
| Mobile | <640px |
| Tablet | 640–899px |
| Laptop | 900–1199px |
| Desktop | 1200–1599px |
| Wide | 1600px+ |

---

# Image Aspect Ratios

| Usage | Ratio |
|-------|------|
| Hero | 16:9 |
| Project Cards | 4:3 |
| Gallery | 3:2 |
| Portrait | 4:5 |

---

# Components

## Buttons

### Primary

- Blueprint Blue background
- White text
- 12px × 24px padding
- 6px radius

### Secondary

- White background
- Blueprint border
- Blueprint text

Hover:

- Blueprint background
- White text

---

## Cards

Cards should have:

- generous padding
- thin borders
- minimal or no shadows
- subtle hover interaction

---

## Navigation

- Sticky
- Minimal
- Always visible
- No oversized menus

Items:

- Home
- Services
- Projects
- About
- FAQ
- Contact

---

## Icons

Use Lucide icons.

- Stroke: 1.5
- Size: 20–24px
- Colors:
  - Charcoal
  - Blueprint Blue

---

# Layout

## Homepage

Navigation

↓

Hero

↓

Services

↓

Process

↓

Testimonials

↓

Featured Projects

↓

About

↓

CTA

↓

Footer

---

# Accessibility

Target WCAG 2.2 AA.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus indicators
- Accessible forms
- Proper heading hierarchy
- Meaningful alt text
- WCAG AA contrast
- Respect `prefers-reduced-motion`
- Never rely solely on color

---

# Motion

Motion should be subtle.

Allowed:

- opacity
- color
- border-color
- small translate
- minimal shadow

Avoid:

- bouncing
- autoplay
- parallax
- large animations

---

# HTML Philosophy

- Semantic HTML first.
- Prefer landmarks.
- Avoid unnecessary wrappers.

---

# CSS Philosophy

- CSS custom properties
- Intrinsic layouts
- Grid for page layout
- Flexbox inside components
- Avoid fixed heights
- Avoid `!important`
- Keep selectors shallow

---

# Photography

Priority:

1. Finished projects
2. Construction drawings
3. Renderings
4. Rick working
5. Construction progress

Avoid:

- Stock homes
- Fake offices
- Generic blueprints

---

# Tone of Voice

Professional.

Friendly.

Confident.

Never salesy.

Speak like an experienced building designer guiding a client through the process.

---

# Future Components

- Hero
- Service Card
- Process Timeline
- Testimonial
- Project Card
- Project Gallery
- FAQ Accordion
- Contact Form
- CTA Banner
- Footer