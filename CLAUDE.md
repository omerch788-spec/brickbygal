# BrickByGal — LEGO Portfolio Website

LEGO portfolio site for Gal. Hebrew, RTL, no e-commerce. Pure showcase.

## Design Rules

### DO:
- Bold, colorful, playful — LEGO aesthetic
- Neo-brutalist cards: `border: 3px solid #1A1A1A` + `box-shadow: 4px 4px 0px #1A1A1A`
- Hover: shadow → `6px 6px 0px #1A1A1A` + element shifts `translate(-2px, -2px)`
- Fonts: Nunito (headings) + Inter (body) from Google Fonts
- Rounded corners: 12–16px cards, 8px buttons
- Mobile-first responsive
- All text Hebrew, `dir="rtl"` on `<html>` tag
- Framer Motion `whileInView` for scroll animations
- Section backgrounds alternate: white → yellow (`#FFD700`) → light blue → white

### DON'T:
- NO prices, cart, or e-commerce elements anywhere
- NO gradients
- NO dark mode
- NO font sizes below 14px
- NO cramped spacing — generous padding
- NO backend — contact form is UI only (always shows success)

## Color Palette

```
--lego-red:    #E3000B
--lego-yellow: #FFD700
--lego-blue:   #006DB7
--lego-green:  #00A850
--lego-black:  #1A1A1A
--lego-white:  #FFFFFF
--lego-light:  #F5F5F0
```

## Project Structure

```
brickbygal/
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Gallery.jsx
│   │   ├── ModelCard.jsx
│   │   ├── ModelModal.jsx
│   │   ├── About.jsx
│   │   ├── BuildChallenge.jsx
│   │   ├── ContactForm.jsx
│   │   └── Footer.jsx
│   ├── data/models.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html          ← dir="rtl", lang="he", Google Fonts
├── vite.config.js      ← @tailwindcss/vite plugin
├── netlify.toml
└── CLAUDE.md
```

## Tech Stack

- React + Vite
- Tailwind CSS (via @tailwindcss/vite)
- Framer Motion (animations)
- React Hook Form (contact form)
- Deployed on Netlify

## Deployment

- **Production:** https://brickbygal.netlify.app
- Auto-deploys on push to `main`
- `netlify.toml`: `command = "npm run build"`, `publish = "dist"`
