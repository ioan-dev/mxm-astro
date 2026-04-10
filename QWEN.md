# MXM Project Context

## Project Overview

**MXM** is a server-side rendered (SSR) web application built with **Astro 6** and **Node.js**. It serves as a frontend client that integrates with a **Directus CMS** backend (running on `localhost:8055`) to fetch and display dynamic content such as pages, posts, and global site settings.

The project follows a minimal Astro starter pattern but is configured for SSR output using the `@astrojs/node` adapter in standalone mode.

### Key Technologies

| Category | Technology |
|----------|------------|
| **Framework** | Astro 6 |
| **Runtime** | Node.js 22 (Alpine) |
| **CMS Integration** | Directus SDK (`@directus/sdk`) |
| **Styling** | PostCSS with custom mixins, media queries, and px-to-rem conversion |
| **Icons** | `astro-icon` |
| **Code Formatting** | Prettier (with Astro plugin) |
| **Containerization** | Docker (multi-stage build) |

### Project Structure

```
/
├── public/                 # Static assets (fonts, favicons)
│   ├── fonts/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/             # Asset imports
│   ├── components/         # Reusable Astro components
│   │   ├── sections/       # Page section components
│   │   ├── Button.astro
│   │   ├── Button-link.astro
│   │   ├── Footer.astro
│   │   ├── Form.astro
│   │   ├── Header.astro
│   │   ├── Heading.astro
│   │   └── Logo.astro
│   ├── icons/              # SVG icons for astro-icon
│   ├── layouts/            # Page layout wrappers
│   ├── lib/                # Utilities & CMS client
│   │   └── directus.ts     # Directus SDK client with TypeScript types
│   ├── pages/              # File-based routing
│   │   ├── index.astro     # Homepage
│   │   └── [slug].astro    # Dynamic page routes from CMS
│   └── styles/             # Global CSS architecture
│       ├── main.css        # Main CSS entry
│       └── global/         # Modular CSS partials
│           ├── _variables.css
│           ├── _mixins.css
│           ├── _media-queries.css
│           ├── _reset.css
│           ├── _fonts.css
│           ├── _typography.css
│           ├── _utilites.css
│           └── _global.css
├── astro.config.mjs        # Astro configuration
├── postcss.config.cjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration (strict mode)
├── Dockerfile              # Multi-stage Docker build
├── package.json
└── README.md
```

## CMS Data Model (Directus)

The application expects the following collections in Directus:

| Collection | Type | Description |
|------------|------|-------------|
| `global` | Singleton | Site-wide metadata (title, description) |
| `home_page` | Singleton | Homepage-specific content |
| `pages` | Collection | Static pages with slug, title, and HTML content |
| `posts` | Collection | Blog posts with author, image, content, and publish date |

## Building and Running

### Prerequisites

- Node.js 22+
- npm (or compatible package manager)
- Directus CMS instance running (default: `http://localhost:8055`)

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Astro CLI Commands

```bash
# Run any Astro CLI command
npm run astro -- <command>

# Example: Add an integration
npm run astro -- add <package>
```

### Docker

The project includes a multi-stage Dockerfile optimized for production:

```bash
# Build the image
docker build -t mxm-app .

# Run the container
docker run -p 3000:3000 mxm-app
```

The Docker build uses 4 stages:
1. **base** — Alpine Node 22 image
2. **deps** — Clean dependency installation via `npm ci`
3. **build** — Full Astro SSR build
4. **runtime** — Minimal runtime with only built artifacts

The server listens on `0.0.0.0:3000` for container/proxy compatibility.

## Styling Architecture

The project uses a PostCSS-based styling pipeline:

- **postcss-mixins** — Reusable CSS mixins (`_mixins.css`)
- **postcss-custom-media** — Custom media queries (`_media-queries.css`)
- **postcss-media-minmax** — Min/max media query extensions
- **postcss-pxtorem** — Automatic pixel-to-rem conversion (root: 16px)
- **@csstools/postcss-global-data** — Shared data imports

CSS variables are defined in `_variables.css` covering:
- Font families (VelaSans, InterTight)
- Color palette (dark theme: `#0d0d0d`, `#1b1b1b`, `#fbfbfb`)
- Spacing scale (4px–208px)
- Viewport-width units for responsive typography

## Development Conventions

- **TypeScript**: Strict mode enabled via `astro/tsconfigs/strict`
- **Component Structure**: Astro components (`.astro` files) with frontmatter scripts
- **Routing**: File-based routing with dynamic `[slug]` parameters
- **CMS Integration**: Directus SDK with typed schema for type-safe data fetching
- **HTML Content**: CMS content is rendered via `set:html` directive (ensure content is sanitized if user-generated)
- **Localization**: Default HTML lang is set to `ru` (Russian)

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Configures SSR output, Node adapter, and icon integration |
| `src/lib/directus.ts` | Typed Directus client — update Schema type when CMS collections change |
| `src/pages/[slug].astro` | Dynamic page renderer — fetches pages from CMS by slug |
| `postcss.config.cjs` | PostCSS plugin chain for the CSS pipeline |
| `Dockerfile` | Production-ready multi-stage build |

## Notes

- The Directus endpoint URL (`http://localhost:8055`) is hardcoded in `directus.ts`. Update this for different environments.
- The `[slug].astro` page uses `getStaticPaths()` for SSG. If switching to full SSR, consider using Astro endpoints or route params instead.
- The project uses a dark color scheme by default (`--color-bg-primary: #0d0d0d`).
