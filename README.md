# Adithya's Portfolio

A modern, interactive developer portfolio built with **Next.js 15**, **Tailwind CSS 4**, and **GSAP** — featuring smooth scroll-driven animations, dark mode, and a premium glassmorphism aesthetic.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[**Live Demo →**](https://github.com/Adhi1755/Portfolio)

---

## Features

### Design & UX

- **Welcome Screen** — Animated intro with staggered letter reveal and gradient accents
- **Dark / Light Mode** — Toggleable theme with smooth transitions, persisted via `localStorage`
- **Glassmorphism UI** — Translucent navbar and cards with backdrop blur and subtle borders
- **Smooth Scrolling** — Powered by [Lenis](https://lenis.darkroom.engineering/) for buttery 60fps scroll, synced with GSAP ScrollTrigger
- **Scroll-Driven Animations** — Every section animates in via GSAP `ScrollTrigger` with scrub timelines
- **Interactive Cursor Effects** — Floating project preview images follow the mouse on desktop (with viewport clamping)
- **Scroll-Pinned Certifications** — Desktop certifications use a pinned scroll layout with progress bars and cross-fading images
- **Magnetic Hover** — Buttons and interactive elements respond to cursor proximity
- **Responsive** — Fully responsive from 320px mobile to ultra-wide displays, with separate desktop/mobile certification layouts

### Sections

| Section | Highlights |
|---|---|
| **Welcome** | Animated name reveal with letter stagger, gradient dot, expanding line, and tagline |
| **Home** | Typewriter role cycling, avatar, status pill, CTA buttons, social links, scroll indicator |
| **About** | Bio with profile image, floating stat badges (CGPA, NASA Award), grouped skill pills |
| **Projects** | Interactive list with cursor-following image previews (desktop), mobile card images, Show More/Less toggle |
| **Certifications** | Scroll-pinned desktop layout with progress bars & image cross-fade; scrollable card grid on mobile |
| **Contact** | Working contact form (Nodemailer), floating label inputs, social links sidebar, footer |

### Technical

- **Next.js 15** with App Router & Turbopack dev server
- **React 19** with Server & Client components
- **TypeScript** for full type safety
- **Tailwind CSS v4** with custom design tokens via `@theme inline`
- **GSAP 3.13** + ScrollTrigger for all scroll-driven animations
- **Lenis** for smooth scroll with GSAP ticker sync and tab-visibility optimization
- **Framer Motion** available for component-level animations
- **Nodemailer** API route for contact form emails (with XSS-safe HTML escaping)
- **Outfit & Moralana** fonts loaded locally for performance
- **Lucide React** for consistent iconography

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP 3.13 + ScrollTrigger, Framer Motion, tw-animate-css |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React, custom inline SVGs |
| **Typography** | Outfit, Moralana (self-hosted) |
| **Email** | Nodemailer |
| **Linting** | ESLint 9 |

---

## Project Structure

```
Portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js            # POST endpoint — sends email via Nodemailer (XSS-safe)
│   ├── components/
│   │   ├── Home.tsx                # Hero section with typewriter & floating badges
│   │   ├── About.tsx               # Bio, profile image, floating badges & grouped skill pills
│   │   ├── Project.tsx             # Project list with cursor-following previews (viewport-clamped)
│   │   ├── Certifications.tsx      # Scroll-pinned desktop + scrollable mobile cert layouts
│   │   ├── Connect.tsx             # Contact form & social links
│   │   ├── Navigation.tsx          # Responsive navbar with theme toggle & active section indicator
│   │   ├── WelcomeScreen.tsx       # Animated intro overlay with letter stagger
│   │   ├── SmoothScroll.tsx        # Lenis ↔ GSAP ScrollTrigger integration
│   │   └── Magnet/
│   │       └── Magnet.tsx          # Magnetic hover effect component
│   ├── about/
│   │   └── page.tsx                # Standalone About page route
│   ├── projects/
│   │   └── page.tsx                # Standalone Projects page route
│   ├── certificates/
│   │   └── page.tsx                # Standalone Certificates page route (responsive)
│   ├── contact/
│   │   └── page.tsx                # Standalone Contact page route
│   ├── fonts/
│   │   ├── Outfit/                 # Outfit font weights (300–600)
│   │   └── moralana/               # Moralana display font
│   ├── globals.css                 # Tailwind config, custom utilities, animations, glassmorphism
│   ├── layout.tsx                  # Root layout — fonts, metadata, header, smooth scroll
│   └── page.tsx                    # Main page — welcome screen + all sections
├── lib/
│   └── utils.ts                    # cn() utility (clsx + tailwind-merge)
├── public/
│   ├── images/                     # Project screenshots (14 projects)
│   ├── Certificates/               # Certificate images (7 certs)
│   ├── Avatar.png                  # Profile avatar
│   └── Profile.jpg                 # About section profile photo
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Adhi1755/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (Turbopack enabled)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start the production server
npm start
```

---

## Contact Form Setup

The contact form uses **Nodemailer** to send emails. Create a `.env.local` file in the project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

> **Note:** For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular account password.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by [Adithya](https://github.com/Adhi1755)**
