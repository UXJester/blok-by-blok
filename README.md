# Blok by Blok

A Next.js application powered by Storyblok CMS for dynamic content management and delivery. Features draft mode, environment switching, and markdown rendering capabilities.

## Features

- 🚀 Built with Rect 19+, Next.js 15+, and App Router
- 📝 Storyblok CMS integration for dynamic content management
- 🔄 Draft mode for content preview switching
- 🌍 Environment switching (development/production)
- 📱 Dynamic slug-based routing for flexible page creation
- 🛠️ TypeScript support for type safety
- 📰 Markdown rendering capabilities
- 🍪 Cookie-based environment and draft mode management

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```bash
   # Environment Configuration
   ENVIRONMENT=development

   # Storyblok Configuration
   STORYBLOK_API_URL=https://api.storyblok.com/v2/cdn
   STORYBLOK_ACCESS_TOKEN=your_access_token_here
   STORYBLOK_PREVIEW_ACCESS_TOKEN=your_preview_token_here

   # Draft Mode
   DRAFT_MODE=true
   ```

   Replace `your_access_token_here` and `your_preview_token_here` with your actual Storyblok tokens from your Storyblok space settings.

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
blok-by-blok/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global CSS styles
│   │   ├── layout.tsx      # Root layout component
│   │   ├── page.tsx        # Home page component
│   │   ├── favicon.ico     # App favicon
│   │   ├── [slug]/         # Dynamic routing for Storyblok pages
│   │   │   └── page.tsx    # Dynamic page component
│   │   └── api/            # Utility API routes
│   │       ├── clear-cookies/
│   │       │   └── route.ts    # Clear environment/draft cookies
│   │       ├── set-draft-mode/
│   │       │   └── route.ts    # Enable/disable draft mode
│   │       └── set-environment/
│   │           └── route.ts    # Switch between environments
│   ├── components/          # Reusable UI components
│   │   ├── CookieNotice.tsx    # Cookie consent notice
│   │   ├── EnvironmentToggle.tsx   # Environment Controls
│   │   └── Markdown.tsx        # Markdown content renderer
│   ├── types/
│   │   └── blokTypes.ts    # Storyblok type definitions
│   └── utils/
│       └── storyblok.ts    # Storyblok API utilities
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Development

### Key Development Areas

1. **Dynamic Routing (`[slug]`):**

   - `app/[slug]/page.tsx` handles all dynamic pages
   - Pages are created dynamically based on story slugs
   - Supports nested routes and custom page structures from CMS

2. **Storyblok API Integration:**

   - `src/utils/storyblok.ts` contains API utilities and configuration
   - `src/types/blokTypes.ts` defines TypeScript types for content
   - Handles content fetching, draft mode, and environment switching

3. **API Routes:**

   - `api/clear-cookies/route.ts` - Clears environment and draft mode cookies
   - `api/set-draft-mode/route.ts` - Toggles draft mode for content preview
   - `api/set-environment/route.ts` - Switches between development/production environments

4. **Components:**
   - `CookieNotice.tsx` - Manages cookie consent and notifications
   - `EnvironmentToggle.tsx` - UI for switching between environments
   - `Markdown.tsx` - Renders markdown content from Storyblok

### Storyblok Features

- **Draft Mode:** Preview unpublished content using `/api/set-draft-mode`
- **Environment Switching:** Toggle between dev/prod content via `/api/set-environment`
- **Dynamic Pages:** All CMS pages accessible via `/[slug]` route
- **Cookie Management:** Environment and draft preferences stored in cookies

### Development Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Working with Content

- Content is managed through Storyblok CMS
- Pages are automatically created based on story slugs
- Use draft mode to preview content before publishing
- Switch environments to test different content versions

## Environment Variables

For local development, you'll need to configure the following environment variables in your `.env` file:

### Required Variables

- **`ENVIRONMENT`** - Only needed for `local development` - Sets the current environment (`development`, `preview` or `production`)
- **`STORYBLOK_API_URL`** - Storyblok API endpoint (default: `https://api.storyblok.com/v2/cdn`)
- **`STORYBLOK_ACCESS_TOKEN`** - Your Storyblok access token for fetching _public_ `published` content
- **`STORYBLOK_PREVIEW_ACCESS_TOKEN`** - Your Storyblok token for _preview_ draft and published content access
- **`DRAFT_MODE`** - Enable/disable draft mode by default (`true` or `false`)

### Getting Storyblok Tokens

1. Log into your [Storyblok](https://app.storyblok.com/) account
2. Navigate to your space settings
3. Go to the "Access Tokens" section
4. Copy the "Preview" token for `STORYBLOK_PREVIEW_ACCESS_TOKEN`
5. Copy the "Public" token for `STORYBLOK_ACCESS_TOKEN`

_**Note:** this step is skipped for this demo as content was specifically set up for use in the demo_

### Example `.env`

```bash
ENVIRONMENT=development
STORYBLOK_API_URL=https://api.storyblok.com/v2/cdn
STORYBLOK_ACCESS_TOKEN=your_public_token_here
STORYBLOK_PREVIEW_ACCESS_TOKEN=your_preview_token_here
DRAFT_MODE=true
```

_**Note:** Never commit your `.env` file to version control. It's already included in `.gitignore`._

## Tech Stack

- **Library:** React 19+
- **Framework:** Next.js 15+ with App Router
- **CMS:** Storyblok for content management
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Content:** Markdown rendering support

## Deployment

Deploy easily on [Vercel](https://vercel.com/new) or any platform that supports Next.js applications.

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
