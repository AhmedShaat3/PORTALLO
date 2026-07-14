# Premium Portfolio — Next.js + TypeScript + Tailwind + Framer Motion

A dark, glassmorphic, single-page portfolio built for a software engineer / AI specialist /
cybersecurity professional. Every section reads its content from JSON files, so you can update
the entire site without touching code.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production:

```bash
npm run build
npm start
```

## Editing content (no code required)

Everything lives in `/content/*.json`:

| File | Controls |
|---|---|
| `profile.json` | Name, title, tagline, bio, mission, values, timeline, socials, contact info |
| `skills.json` | Skill categories, items, and progress-bar percentages |
| `experience.json` | Work history timeline cards |
| `projects.json` | Project cards, tech stack, links, stats |
| `certificates.json` | Optional metadata (title/issuer/date) for certificate images, keyed by filename |
| `gallery.json` | Optional captions for gallery photos, keyed by filename |
| `achievements.json` | Award cards |
| `education.json` | Education timeline |
| `testimonials.json` | Testimonial slider content |
| `stats.json` | Animated counters |
| `translations.json` | English + Arabic UI strings (nav, buttons, headings) |

## Images — just drop files in, no code changes

- **Certificates**: add any `.jpg/.png/.webp` to `/public/certificates/`. It appears in the
  Certificates section automatically. Add an entry in `content/certificates.json` (keyed by the
  exact filename) if you want a custom title/issuer/date/verify link — otherwise a title is
  generated from the filename.
- **Gallery photos**: add any image to `/public/images/gallery/`. It appears in the masonry
  Gallery section automatically. Optional captions go in `content/gallery.json`.
- **Profile photo**: replace `/public/images/hero/profile-placeholder.jpg` (keep the same
  filename, or update `profile.json > photo`).
- **Resume/CV**: replace `/public/cv/resume-placeholder.pdf` (keep the same filename, or update
  `profile.json > resumeUrl`).
- **Project screenshots**: replace files in `/public/images/projects/` and update the `cover`
  path in `projects.json` if you rename them.
- **Company logos**: replace files in `/public/logos/`.

All of the above are pre-seeded with on-brand placeholder graphics so the site looks complete on
first run — swap the files whenever you have real assets.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom dark/cyan/blue design tokens in `tailwind.config.ts`)
- Framer Motion for scroll reveals, micro-interactions, and page transitions
- Lucide React icons
- Zero external UI kit — every component is hand-built and lives in `/components`

## Features included

- Dark/light theme toggle (persisted to `localStorage`)
- English/Arabic language toggle with full RTL layout support (persisted to `localStorage`)
- Animated hero with typing effect, floating badges, and a canvas neural-network background
- Scroll-reveal animations throughout, custom cursor, scroll progress bar, loading screen
- Skills with animated progress bars, filterable Projects and Certificates grids
- Auto-populating Certificate gallery and Photo gallery (see above) with lightbox previews
- Testimonial slider, animated statistics counters, contact form, floating nav with search
- SEO: metadata, Open Graph tags, `robots.ts`, `sitemap.ts`
- Accessible: visible focus states, semantic landmarks, `prefers-reduced-motion` respected

## Wiring up the contact form

The contact form in `components/Contact.tsx` currently simulates a submission. Connect it to a
real endpoint (an API route, Formspree, Resend, etc.) inside the `handleSubmit` function.

## Deployment

Works out of the box on Vercel (`vercel deploy`) or any Node hosting that supports Next.js 14.
