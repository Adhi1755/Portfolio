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

## Preview

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Portfolio Light](/public/images/Portfolio.png) | Dark theme with glowing accents |

---

## Features

### Design & UX

- **Dark / Light Mode** — Toggleable theme with smooth transitions, persisted across sessions
- **Glassmorphism UI** — Translucent cards with backdrop blur and subtle borders
- **Smooth Scrolling** — Powered by [Lenis](https://lenis.darkroom.engineering/) for buttery 60fps scroll
- **Scroll-Driven Animations** — Every section animates in via GSAP `ScrollTrigger` scrub timelines
- **Interactive Cursor Effects** — Floating project preview images follow the mouse on desktop
- **Spotlight Effect** — Radial gradient follows the cursor on certification cards
- **Responsive** — Fully responsive layout from mobile to ultra-wide displays

### Sections

| Section | Highlights |
|---|---|
| **Home** | Typewriter intro, floating SVG badges, avatar with magnetic hover, CTA buttons |
| **About** | Tabbed skills showcase (AI/ML, Frontend, Backend, Tools), personal bio, stats |
| **Projects** | Interactive project list with cursor-following image previews (desktop), direct GitHub links |
| **Certifications** | Timeline layout with animated dots & connectors, skill tags, spotlight hover effect |
| **Contact** | Working contact form (server-side email via Nodemailer), social links, contact details |
| **Footer** | Minimal footer with branding |

### Technical

- **Next.js 15** with App Router & Turbopack dev server
- **React 19** with Server & Client components
- **TypeScript** for full type safety
- **Tailwind CSS v4** with custom design tokens
- **GSAP 3.13** + ScrollTrigger for all animations
- **Lenis** for smooth scroll
- **Framer Motion** for component-level animations
- **Nodemailer** API route for contact form emails
- **Outfit** font loaded locally for performance
- **Lucide React** for consistent iconography

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP 3.13, Framer Motion, tw-animate-css |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React, custom inline SVGs |
| **Typography** | Outfit (self-hosted) |
| **Email** | Nodemailer |
| **Linting** | ESLint 9 |

---

## Project Structure

```
Portfolio/
├── app/
│   ├── api/
│   │   └── contact/            # POST endpoint — sends email via Nodemailer
│   ├── components/
│   │   ├── Home.tsx            # Hero section with typewriter & floating badges
│   │   ├── About.tsx           # Skills showcase with tabbed categories
│   │   ├── Project.tsx         # Project list with cursor-following previews
│   │   ├── Certifications.tsx  # Timeline + certification cards
│   │   ├── Connect.tsx         # Contact form & social links
│   │   ├── Navigation.tsx      # Responsive navbar with theme toggle
│   │   ├── Footer.tsx          # Footer
│   │   ├── SmoothScroll.tsx    # Lenis ↔ GSAP ScrollTrigger integration
│   │   ├── SplashCursor.jsx    # Interactive cursor splash effect
│   │   └── Magnet/             # Magnetic hover effect component
│   ├── fonts/                  # Locally loaded Outfit font files
│   ├── globals.css             # Tailwind config, custom utilities, glassmorphism
│   ├── layout.tsx              # Root layout — font, metadata, header, smooth scroll
│   └── page.tsx                # Main page — assembles all sections
├── public/
│   ├── images/                 # Project screenshots
│   └── Avatar.png              # Profile avatar
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

The contact form uses **Nodemailer** to send emails. Create a `.env.local` file in the project root and add the following:

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
