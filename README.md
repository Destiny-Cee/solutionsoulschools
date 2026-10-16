# Solution Souls Schools Website

A complete, modern, responsive school website built with **HTML5**, **CSS3**, and **Vanilla JavaScript** — no frameworks or libraries.

## Brand Identity

**Light Blue + Dark Blue** — reflecting the school's uniform and visual identity.

| Token | Color | Hex |
|-------|-------|-----|
| `--primary-dark` | Deep Navy Blue | `#082B52` |
| `--primary-blue` | Medium Blue | `#1976B8` |
| `--light-blue` | Light Blue | `#DFF3FF` |
| `--white` | White | `#FFFFFF` |
| `--off-white` | Off-White | `#F7FAFC` |
| `--text-dark` | Charcoal | `#263238` |
| `--text-muted` | Muted Gray | `#607080` |
| `--border-light` | Light Border | `#D9EAF5` |

All colors are centralized as CSS variables in `css/style.css` for easy updates.

## File Structure

```
solution-souls-schools/
├── index.html              # Home page
├── pages/
│   ├── about.html          # About Us
│   ├── academics.html      # Academics
│   ├── admissions.html     # Admissions (with form)
│   ├── student-life.html   # Student Life
│   ├── gallery.html        # Gallery (filterable + lightbox)
│   ├── news.html           # News & Events (search + filter)
│   └── contact.html        # Contact (with form + map)
├── css/
│   ├── style.css           # Main styles, variables, components
│   ├── responsive.css      # Media queries (mobile-first)
│   └── animations.css      # Keyframes, scroll reveals
├── js/
│   ├── navigation.js       # Mobile menu, sticky header, active states
│   ├── main.js             # Scroll reveals, counters, accordion, back-to-top
│   ├── gallery.js          # Filtering, lightbox, keyboard navigation
│   ├── forms.js            # Validation, toast notifications, newsletter
│   └── news.js             # Search, category filter, load more
├── assets/
│   ├── images/             # Add your school images here
│   ├── icons/              # Add custom icons here
│   └── logo/               # Add logo files here
└── README.md
```

## Features

- **Responsive design** — works on desktop, tablet, and mobile
- **Sticky navigation** with scroll effect and mobile drawer
- **Gallery** with category filtering and keyboard-accessible lightbox
- **News** with search, category filters, and "Load More" button
- **Forms** with JavaScript validation and toast notifications
- **Scroll reveal animations** using IntersectionObserver
- **Counter animations** for statistics
- **FAQ accordion** on admissions page
- **Back-to-top button**
- **Accessibility**: skip links, ARIA labels, focus states, semantic HTML
- **SEO**: meta tags, Open Graph, JSON-LD structured data

## Getting Started

1. Clone or download the project
2. Open `index.html` in a browser
3. Replace placeholder content with real school information

## Replacing Placeholders

Search for these placeholders and replace with actual content:

- `[School Address]`
- `[Phone Number]`
- `[Email Address]`
- `[Office Hours]`
- `[Principal's Name]`
- `[Vice Principal's Name]`
- `[Academic Coordinator's Name]`
- `[Parent Name]`
- `[Student Name]`

## Replacing Images

1. Add your images to `assets/images/`
2. Replace the Unsplash URLs in HTML with your local image paths
3. Update `alt` text to match your images

Example:
```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-...?w=600&q=80" alt="Students learning">

<!-- After -->
<img src="../assets/images/classroom-01.jpg" alt="Students in Grade 3 classroom">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (variables, grid, flexbox, animations)
- Vanilla JavaScript (ES6+, IntersectionObserver, modules)

No build tools, no frameworks, no dependencies.
