# Creative Portfolio & Shop - Product Requirements Document

## 1. Overview

A personal website to showcase visual art and illustration work, with integrated e-commerce functionality for selling physical products (prints, originals, merchandise). The site serves as both a portfolio to attract clients/collectors and a storefront for direct sales.

## 2. Key Features

- **Portfolio Gallery**: Curated display of artwork with high-quality images, categories, and project details
- **E-commerce Shop**: Product listings with cart, checkout, and payment processing
- **Order Management**: Track orders, manage inventory, handle shipping
- **Content Management**: Admin interface for uploading work and managing products
- **Contact/Inquiry System**: Allow potential clients or buyers to reach out
- **Responsive Design**: Optimized viewing experience across desktop, tablet, and mobile

## 3. System Architecture

### 3.1 Backend Server

Node.js + TypeScript + Next.js server handling API routes, authentication, image uploads, order processing, and admin operations. Can run on modest hardware or cloud platform.

### 3.2 Database

PostgreSQL database storing artwork metadata, product catalog, orders, customer information, inquiries, and site configuration.

### 3.3 File Storage

Cloud storage (S3, Cloudinary, or similar) for artwork images with automatic optimization and CDN delivery for fast loading.

### 3.4 Payment Processing

Stripe integration for secure payment handling, including checkout sessions, webhooks for order fulfillment, and refund processing.

### 3.5 Email Service

Transactional email provider (Resend, SendGrid) for order confirmations, shipping notifications, and inquiry responses.

### 3.6 Background Job Scheduler

Scheduled tasks for order status updates, abandoned cart reminders, inventory alerts, and image processing/optimization.

### 3.7 Deployment Model

The system supports flexible deployment options:

- **Cloud hosting (recommended):** Vercel or similar platform with managed PostgreSQL (Supabase, Neon)
- **Self-hosted option:** Node.js server on VPS or mini-PC with 4GB+ RAM
- **Storage:** Cloud storage (S3, Cloudinary) for artwork images with CDN delivery
- **Domain:** Connect existing registered domain via DNS configuration
- **SSL:** Automatic via hosting provider

## 4. Technical Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js 20+ LTS |
| Language | TypeScript 5+ |
| Framework | Next.js 14+ (App Router) |
| Database | PostgreSQL 15+ |
| ORM | Prisma |
| Authentication | NextAuth.js with JWT strategy |
| Styling | Tailwind CSS |
| Data Fetching | React Query |
| Payments | Stripe SDK |
| File Upload | Next.js API routes with formidable or uploadthing |
| Image Storage | Cloudinary or AWS S3 |
| Job Scheduler | node-cron or Vercel Cron |
| Email | Resend or SendGrid |
| Hosting | Vercel |
| Version Control | GitHub |

## 5. Data Models

### 5.1 AdminUser

Authentication for the admin dashboard.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| email | String | Unique, required |
| password_hash | String | Bcrypt hashed |
| name | String | Display name |
| created_at | DateTime | |
| updated_at | DateTime | |

### 5.2 Category

Shared categories for both Artwork and Products.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | e.g., "Illustration", "Prints", "Merch" |
| slug | String | URL-friendly, unique |
| description | String? | Optional |
| display_order | Int | For sorting in navigation |
| created_at | DateTime | |

### 5.3 Artwork

Portfolio pieces (may or may not be for sale).

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| title | String | Required |
| slug | String | URL-friendly, unique |
| description | Text? | Artist notes, inspiration |
| category_id | UUID | FK → Category |
| medium | String? | e.g., "Digital", "Oil on canvas" |
| dimensions | String? | e.g., "18 × 24 inches" |
| year | Int? | Year created |
| images | JSON | Array of image URLs |
| featured | Boolean | Show on homepage (default: false) |
| display_order | Int? | For manual sorting |
| created_at | DateTime | |
| updated_at | DateTime | |

### 5.4 Product

Items for sale in the shop. Can optionally link to an Artwork, or exist independently (merch, etc.).

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| artwork_id | UUID? | FK → Artwork (optional) |
| category_id | UUID | FK → Category |
| title | String | Required |
| slug | String | URL-friendly, unique |
| description | Text? | Product details |
| price | Decimal | In cents or dollars |
| compare_at_price | Decimal? | Original price (for sales) |
| inventory_count | Int | Stock quantity |
| sku | String? | Optional stock-keeping unit |
| images | JSON | Array of image URLs |
| weight_oz | Decimal? | For shipping calculation |
| active | Boolean | Published to shop (default: true) |
| featured | Boolean | Show on homepage (default: false) |
| created_at | DateTime | |
| updated_at | DateTime | |

### 5.5 ShippingZone

Shipping rates by region.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | e.g., "Domestic", "International", "Local Pickup" |
| countries | JSON | Array of country codes, or ["*"] for all |
| base_rate | Decimal | Flat rate |
| per_item_rate | Decimal? | Additional per item (optional) |
| free_threshold | Decimal? | Free shipping above this amount |
| estimated_days | String? | e.g., "3-5 business days" |
| active | Boolean | Default: true |
| created_at | DateTime | |

### 5.6 Order

Customer purchases (guest checkout — no accounts).

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| order_number | String | Human-readable (e.g., "MM-2026-0001") |
| email | String | Buyer email |
| name | String | Buyer full name |
| shipping_address | JSON | {street, city, state, postal, country} |
| line_items | JSON | [{product_id, title, price, quantity, image}] |
| subtotal | Decimal | Sum of line items |
| shipping_cost | Decimal | From ShippingZone |
| shipping_zone_id | UUID? | FK → ShippingZone |
| tax | Decimal | If applicable |
| total | Decimal | Final amount charged |
| status | Enum | pending / paid / shipped / delivered / cancelled |
| stripe_payment_id | String? | Stripe checkout session or payment intent |
| tracking_number | String? | Shipping tracking |
| notes | Text? | Internal admin notes |
| created_at | DateTime | |
| updated_at | DateTime | |

### 5.7 Inquiry

Contact form submissions.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | Sender name |
| email | String | Sender email |
| subject | String? | Optional subject line |
| message | Text | Message body |
| status | Enum | new / read / replied |
| created_at | DateTime | |

### 5.8 SiteConfig

Key-value store for site settings.

| Field | Type | Notes |
|-------|------|-------|
| key | String | Primary key (e.g., "site_title", "about_text") |
| value | Text | Setting value |
| updated_at | DateTime | |

## 6. API Endpoints

**Public:**
- GET /api/artwork - List artwork with filtering/pagination
- GET /api/artwork/:slug - Single artwork details
- GET /api/products - List available products
- GET /api/products/:slug - Single product details
- GET /api/categories - List categories
- POST /api/inquiries - Submit contact form

**Shop:**
- POST /api/cart - Create/update cart session
- GET /api/cart - Retrieve cart
- POST /api/checkout - Create Stripe checkout session
- POST /api/webhooks/stripe - Handle payment events

**Admin (authenticated):**
- CRUD /api/admin/artwork - Manage artwork
- CRUD /api/admin/products - Manage products
- CRUD /api/admin/categories - Manage categories
- GET /api/admin/orders - List orders
- PATCH /api/admin/orders/:id - Update order status
- GET /api/admin/inquiries - View inquiries
- PATCH /api/admin/inquiries/:id - Mark as read/replied

## 7. Pages

**Public:**
- `/` - Home with featured work and intro
- `/work` - Portfolio gallery with category filtering
- `/work/[slug]` - Individual artwork page
- `/shop` - Product listings
- `/shop/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout/success` - Order confirmation
- `/about` - Artist bio and statement
- `/contact` - Contact form

**Admin:**
- `/admin` - Dashboard with recent orders/stats
- `/admin/artwork` - Manage artwork
- `/admin/products` - Manage products
- `/admin/orders` - Order management
- `/admin/inquiries` - View messages

## 8. Work Breakdown

**Phase 1 - Foundation:**
- Project setup (Next.js, TypeScript, Tailwind, Prisma)
- Database schema and migrations
- Authentication for admin
- Basic layout and navigation

**Phase 2 - Portfolio:**
- Artwork data model and admin CRUD
- Image upload and optimization pipeline
- Public gallery pages with filtering
- Individual artwork pages

**Phase 3 - E-commerce:**
- Product data model and admin CRUD
- Shopping cart functionality
- Stripe integration and checkout flow
- Order management and status tracking
- Email notifications (order confirmation, shipping)

**Phase 4 - Polish:**
- Contact form and inquiry management
- SEO optimization (meta tags, sitemap, structured data)
- Performance optimization (image lazy loading, caching)
- Analytics integration
- Mobile responsiveness refinement

## 9. Deployment Considerations

**Hosting:** Vercel (pairs well with Next.js, includes CDN)

**Database:** Supabase or Neon for managed PostgreSQL

**Images:** Cloudinary for automatic optimization and resizing, or S3 + CloudFront

**Domain:** Connect existing registered domain via DNS

**SSL:** Automatic via Vercel

**Backups:** Automated database backups via hosting provider

## 10. Success Criteria

- Portfolio displays artwork beautifully across all devices
- Visitors can browse, add to cart, and complete purchases smoothly
- Admin can easily upload new work and manage products/orders
- Site loads quickly with optimized images
- SEO enables discovery through search engines
- Payment processing is secure and reliable