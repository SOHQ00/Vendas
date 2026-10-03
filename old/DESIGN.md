---
name: Apex Chrono High-Performance
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#303034'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffb599'
  on-secondary: '#5a1c00'
  secondary-container: '#ff5e00'
  on-secondary-container: '#531900'
  tertiary: '#d8ffe7'
  on-tertiary: '#003824'
  tertiary-container: '#65f2b5'
  on-tertiary-container: '#006d4a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 38px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-numeric:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
  cta-button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system defines an elite, performance-driven mobile e-commerce experience tailored for luxury smartwatches with advanced biometric tracking, calling features, and precision hardware. Built to merge the tactile elegance of horology (matte titanium, brushed Milanese mesh) with hyper-responsive digital athleticism, the aesthetic relies on a refined dark mode foundation elevated through subtle glassmorphism and vivid luminous accents.

Targeting tech executives, triathletes, and design enthusiasts who demand both utilitarian durability and boardroom sophistication, the interface evokes power, precision, and instant trust. The visual direction balances deep obsidian canvases with frosted translucent cards, micro-borders, and high-energy neon telemetry highlights. High-converting elements are strategically punchy, ensuring swift scannability and frictionless checkout pathways on handheld viewports.

## Colors
The color hierarchy is anchored in deep dark matter tones, punctuated by vivid functional highlights inspired by modern watch face instrumentation and high-performance automotive cockpits:

- **Primary (`#00F0FF` - Electric Cyan):** Represents high technology, Bluetooth 5.3 connectivity, AI voice interfaces, and active states. Used for telemetry glows, primary highlights, interactive indicators, and technology specs.
- **Secondary (`#FF5E00` - Kinetic Orange):** Dedicated strictly to conversion velocity. Reserved for primary Purchase CTAs, sticky mobile buy drawers, urgency counters, and checkout progression.
- **Tertiary (`#10B981` - Emerald Vital):** Reserved for bio-metrics, cardiac telemetry, battery longevity, warranty approval badges, and security endorsements.
- **Accent Gold (`#EAB308` / Amber):** Applied sparingly to 5-star review ratings, official manufacturer certificates, and VIP packaging tiers.
- **Neutral Surface Palette:**
  - Base Canvas: `#050608`
  - Surface Glass: `rgba(18, 22, 31, 0.70)` with a subtle inner border `rgba(255, 255, 255, 0.08)`
  - Elevated Container: `#161922`
  - Text Primary: `#F8FAFC`
  - Text Secondary: `#94A3B8`
  - Text Muted: `#64748B`

## Typography
The typographic hierarchy merges the geometric authority of **Plus Jakarta Sans** for headlines and brand value statements with the hyper-legible neutral cadence of **Inter** for technical body copy and specifications. For raw hardware telemetry, sensor specifications, and price anchors, **JetBrains Mono** provides a technical, precision-engineered instrument feel.

All mobile headline scales feature tighter tracking (-0.02em) to maximize screen economy and retain editorial presence. Data labels and specs styled in the monospaced font utilize uppercase styling with loose tracking (+0.05em) to replicate tactical gauge markings.

## Layout & Spacing
This system is engineered mobile-first, utilizing a 4-column fluid grid system on mobile viewports (<640px) expanding into an 8-column layout on tablets (640px-1024px) and 12 columns on desktop. 

- **Outer Margins:** Fixed at `1rem` (16px) on mobile screens to preserve maximum horizontal canvas for product photography, 360-degree rotation viewers, and feature carousels.
- **Section Rhythm:** Sections adhere to a rhythmic `space-xl` (40px) vertical separation, utilizing luminous divider lines (`1px` height with gradient fading to edge) to section off hardware breakdown, health telemetry, and social proof.
- **Touch Targets:** Interactive tap targets (strap selectors, finish toggles, carousel bullets) enforce a strict minimum bound of 44x44px.

## Elevation & Depth
Depth is constructed through multi-layered dark glassmorphism paired with colored radiance spills rather than stark opaque drops:

- **Level 1 (Base Cards):** Background `rgba(18, 22, 31, 0.65)` layered over deep base canvas, combined with `backdrop-filter: blur(16px)` and a crisp low-contrast perimeter stroke (`1px solid rgba(255, 255, 255, 0.08)`).
- **Level 2 (Elevated Spec & Comparison Modules):** Background `rgba(26, 32, 44, 0.85)` with ambient shadow `0 12px 32px -8px rgba(0, 0, 0, 0.65)`.
- **Level 3 (Sticky Conversion Bar & Overlays):** Grounded by a bottom navigation glass drawer featuring `rgba(10, 12, 16, 0.92)` with `backdrop-filter: blur(20px)` and an ambient secondary glow `0 -8px 24px -4px rgba(255, 94, 0, 0.15)` pointing up toward the primary CTA.
- **Accent Glows:** Sensor panels and product highlights employ radial background blurs (`radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%)`) positioned behind the floating watch assets.

## Shapes
A roundedness tier of `2` (`0.5rem` / 8px default, `1rem` / 16px for cards, `1.5rem` / 24px for macro containers) reflects the circular chamfers of the smartwatch bezel and milanese mesh links.

- **Feature Cards & Modals:** Standardized on `rounded-lg` (16px) to emulate the curvature of the smartwatch glass edge.
- **Badges & Micro Pills:** Standardized on fully circular pill shapes (`rounded-full`) for watch specs, battery life tags, and guarantee seals.
- **Product Image Podiums:** Circular radial cutouts mirroring the circular dial of the physical timepiece.

## Components

### Buttons & Conversion CTAs
- **Primary Purchase CTA:** High-gloss gradient from `#FF5E00` to `#FF7A1A`, text in white `Plus Jakarta Sans 700`, with subtle bevel highlights (`inset 0 1px 0 rgba(255,255,255,0.2)`) and dynamic drop glow `0 8px 24px rgba(255, 94, 0, 0.35)`.
- **Secondary Action (Explore Specs/360 View):** Dark glass pill (`rgba(255, 255, 255, 0.05)`), border `1px solid rgba(0, 240, 255, 0.3)`, text in `#00F0FF`.
- **Sticky Bottom Cart Bar:** Affixed to mobile viewport bottom, containing live price, installment calculations, and the primary conversion CTA with zero layout shift.

### Badges & Guarantee Seals
- **Security & Warranty Badges:** Emerald-tinted pills (`background: rgba(16, 185, 129, 0.12)`, `border: 1px solid rgba(16, 185, 129, 0.3)`), paired with micro lock/shield icons in `#10B981`.
- **Authenticity Seals:** Metallic brushed gold gradient pill (`background: linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.05))`, text `#FACC15`).

### Product Variant Selectors (Straps & Finishes)
- **Finish Selector:** Circular swatches (36px diameter) featuring high-precision metallic gradients (Matte Black, Milanese Mesh, Sport Silicone) with an active state highlighted by a 2px offset ring in `#00F0FF`.
- **Band Toggles:** Segmented control within a glass container, active segment indicated by a smooth background slide in `#1E2433`.

### Feature & Telemetry Cards
- **Dark Glass Feature Cards:** Rounded 16px containers with 1px top-lit stroke (`rgba(255, 255, 255, 0.12)` fading to `rgba(255, 255, 255, 0.02)` at bottom). Icons nested inside neon-tinted circular badges (e.g., Cyan for Bluetooth 5.3 & AI Voice, Green for Biometrics/Heart Rate).

### Input Fields & Checkout Selectors
- **Address & Payment Fields:** Dark charcoal fills (`#0D0F14`), inset border `1px solid rgba(255, 255, 255, 0.1)`, with focus state transitioning to a sharp `#00F0FF` outline and subtle cyan outer bloom.