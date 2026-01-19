# AGENTS.md

Project instructions for AI coding assistants.

## Project Overview

Creative portfolio and e-commerce site for an artist. Showcases visual art/illustration with integrated shop for prints, originals, and merchandise.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5+
- **Database:** PostgreSQL 15+ with Prisma ORM
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js with JWT
- **Payments:** Stripe
- **Images:** Cloudinary or S3
- **Hosting:** DreamHost VPS with Passenger

## Project Structure

```
src/
  app/              # Next.js App Router pages
    (public)/       # Public routes (/, /work, /shop, /about, /contact)
    admin/          # Admin dashboard routes
    api/            # API route handlers
  components/       # React components
    ui/             # Base UI components (Button, Card, Input)
    layout/         # Header, Footer, Navigation
    artwork/        # Artwork-specific components
    shop/           # Shop/product components
    admin/          # Admin panel components
  lib/              # Utilities and shared logic
    db.ts           # Prisma client
    stripe.ts       # Stripe client
    auth.ts         # Auth configuration
  types/            # TypeScript type definitions
prisma/
  schema.prisma     # Database schema
```

## Code Conventions

### TypeScript
- Strict mode enabled
- Prefer interfaces over types for object shapes
- Use `unknown` over `any`
- Export types from dedicated `types/` files

### React/Next.js
- Use Server Components by default, Client Components only when needed
- Colocate client components with `"use client"` directive
- Use React Query for client-side data fetching
- Server Actions for mutations where appropriate

### Styling
- Tailwind utility classes only (no custom CSS unless necessary)
- Follow the design system in DESIGN.md:
  - Background: `bg-stone-50` (#FAFAF9)
  - Text: `text-stone-900` (#1C1917)
  - Accent: `text-stone-800` (#292524)
- Use consistent spacing scale (4, 8, 16, 24, 32, 48, 64, 96px)

### Database
- Use Prisma for all database operations
- Never write raw SQL unless Prisma can't express the query
- Use transactions for multi-step operations

### API Routes
- Return consistent JSON response shapes
- Handle errors with appropriate HTTP status codes
- Validate input with zod

## Key Patterns

### Image Handling
- Store images in Cloudinary/S3, not locally
- Use Next.js Image component with proper sizing
- Support WebP with JPEG fallback
- Implement lazy loading below the fold

### Authentication
- Admin-only authentication (no customer accounts)
- JWT strategy via NextAuth.js
- Protect all `/admin` and `/api/admin/*` routes

### Payments
- Use Stripe Checkout for payment flow
- Verify webhooks with signature checking
- Never store card data

## Important Files

- `PRD.md` - Full product requirements
- `DESIGN.md` - Visual design system and wireframes
- `prisma/schema.prisma` - Database schema

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

## Security Notes

- Validate all user input at API boundaries
- Use parameterized queries (Prisma handles this)
- Set security headers (CSP, X-Frame-Options, etc.)
- Never commit secrets - use environment variables
