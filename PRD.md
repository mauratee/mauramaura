# Creative Portfolio & Shop - Product Requirements Document

## Table of Contents

1. [Overview](#1-overview)
2. [Key Features](#2-key-features)
3. [Milestones](#3-milestones)
4. [System Architecture](#4-system-architecture)
5. [Technical Stack](#5-technical-stack)
6. [Data Models](#6-data-models)
7. [API Endpoints](#7-api-endpoints)
8. [Pages](#8-pages)
9. [Work Breakdown](#9-work-breakdown) → See [TASKS.md](./TASKS.md)
10. [Deployment Considerations](#10-deployment-considerations)
11. [Success Criteria](#11-success-criteria)

---

## 1. Overview

A personal website to showcase visual art and illustration work, with integrated e-commerce functionality for selling physical products (prints, originals, merchandise). The site serves as both a portfolio to attract clients/collectors and a storefront for direct sales.

## 2. Key Features

- **Portfolio Gallery**: Curated display of artwork with high-quality images, categories, and project details
- **E-commerce Shop**: Product listings with cart, checkout, and payment processing
- **Order Management**: Track orders, manage inventory, handle shipping
- **Content Management**: Admin interface for uploading work and managing products
- **Contact/Inquiry System**: Allow potential clients or buyers to reach out
- **Responsive Design**: Optimized viewing experience across desktop, tablet, and mobile

## 3. Milestones

### MVP: Landing Page Draft Live

**Goal:** Deploy a draft landing page to the web with core visual design applied

**Scope:**
- Static landing page with hero, about, and contact sections
- Design system implemented (colors, typography, spacing from DESIGN.md)
- Deployed to DreamHost and accessible via domain

**Deferred for later milestones:**
- Portfolio gallery with CMS
- E-commerce shop and checkout
- Admin dashboard
- Database and authentication

**Related tasks:** Phase 1 (Foundation), Phase 2 (Portfolio - landing page components)

---

## 4. System Architecture

### 4.1 Backend Server

Node.js + TypeScript + Next.js server handling API routes, authentication, image uploads, order processing, and admin operations. Can run on modest hardware or cloud platform.

### 4.2 Database

PostgreSQL database storing artwork metadata, product catalog, orders, customer information, inquiries, and site configuration.

### 4.3 File Storage

Cloud storage (S3, Cloudinary, or similar) for artwork images with automatic optimization and CDN delivery for fast loading.

### 4.4 Payment Processing

Stripe integration for secure payment handling, including checkout sessions, webhooks for order fulfillment, and refund processing.

### 4.5 Email Service

Transactional email provider (Resend, SendGrid) for order confirmations, shipping notifications, and inquiry responses.

### 4.6 Background Job Scheduler

Scheduled tasks for order status updates, abandoned cart reminders, inventory alerts, and image processing/optimization.

### 4.7 Deployment Model

The system supports flexible deployment options:

- **Cloud hosting:** DreamHost with managed PostgreSQL (Supabase, Neon)
- **Self-hosted option:** Node.js server on VPS or mini-PC with 4GB+ RAM
- **Storage:** Cloud storage (S3, Cloudinary) for artwork images with CDN delivery
- **Domain:** Connect existing registered domain via DNS configuration
- **SSL:** Automatic via hosting provider

## 5. Technical Stack

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
| Job Scheduler | node-cron |
| Email | Resend or SendGrid |
| Hosting | DreamHost |
| Version Control | GitHub |

## 6. Data Models

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

## 7. API Endpoints

All endpoints return JSON. Errors follow the format: `{ "error": "message", "code": "ERROR_CODE" }`

---

### 6.1 Public Endpoints

#### GET /api/artwork

List artwork with filtering and pagination.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| category | string | — | Filter by category slug |
| featured | boolean | — | Filter featured only |
| page | int | 1 | Page number |
| limit | int | 12 | Items per page (max 50) |

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Mountain Dawn",
      "slug": "mountain-dawn",
      "category": { "id": "uuid", "name": "Illustration", "slug": "illustration" },
      "medium": "Digital",
      "year": 2025,
      "images": ["https://cdn.example.com/art/mountain-dawn.jpg"],
      "featured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4
  }
}
```

---

#### GET /api/artwork/:slug

Get single artwork by slug.

**Response 200:**
```json
{
  "id": "uuid",
  "title": "Mountain Dawn",
  "slug": "mountain-dawn",
  "description": "Inspired by early morning hikes...",
  "category": { "id": "uuid", "name": "Illustration", "slug": "illustration" },
  "medium": "Digital illustration",
  "dimensions": "18 × 24 inches",
  "year": 2025,
  "images": ["https://cdn.example.com/art/mountain-dawn.jpg"],
  "featured": true,
  "created_at": "2025-03-15T10:30:00Z",
  "related_product": {
    "id": "uuid",
    "slug": "mountain-dawn-print",
    "price": 4500
  }
}
```

**Response 404:** `{ "error": "Artwork not found", "code": "NOT_FOUND" }`

---

#### GET /api/products

List products with filtering and pagination.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| category | string | — | Filter by category slug |
| featured | boolean | — | Filter featured only |
| in_stock | boolean | — | Filter in-stock only |
| page | int | 1 | Page number |
| limit | int | 12 | Items per page (max 50) |

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Mountain Dawn Print 8×10",
      "slug": "mountain-dawn-print-8x10",
      "price": 4500,
      "compare_at_price": null,
      "inventory_count": 15,
      "images": ["https://cdn.example.com/products/mountain-dawn-8x10.jpg"],
      "category": { "id": "uuid", "name": "Prints", "slug": "prints" },
      "featured": false
    }
  ],
  "pagination": { "page": 1, "limit": 12, "total": 24, "totalPages": 2 }
}
```

---

#### GET /api/products/:slug

Get single product by slug.

**Response 200:**
```json
{
  "id": "uuid",
  "title": "Mountain Dawn Print 8×10",
  "slug": "mountain-dawn-print-8x10",
  "description": "Archival giclée print on Hahnemühle Photo Rag...",
  "price": 4500,
  "compare_at_price": null,
  "inventory_count": 15,
  "sku": "MD-PRINT-8X10",
  "images": [
    "https://cdn.example.com/products/mountain-dawn-8x10.jpg",
    "https://cdn.example.com/products/mountain-dawn-8x10-detail.jpg"
  ],
  "weight_oz": 4.5,
  "category": { "id": "uuid", "name": "Prints", "slug": "prints" },
  "artwork": {
    "id": "uuid",
    "title": "Mountain Dawn",
    "slug": "mountain-dawn"
  },
  "active": true,
  "featured": false,
  "created_at": "2025-03-15T10:30:00Z"
}
```

**Response 404:** `{ "error": "Product not found", "code": "NOT_FOUND" }`

---

#### GET /api/categories

List all categories.

**Response 200:**
```json
{
  "data": [
    { "id": "uuid", "name": "Illustration", "slug": "illustration", "description": null, "display_order": 1 },
    { "id": "uuid", "name": "Prints", "slug": "prints", "description": null, "display_order": 2 },
    { "id": "uuid", "name": "Merch", "slug": "merch", "description": null, "display_order": 3 }
  ]
}
```

---

#### POST /api/inquiries

Submit contact form.

**Request body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Commission inquiry",
  "message": "I'd love to discuss a custom piece..."
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | yes | 1-100 chars |
| email | string | yes | Valid email |
| subject | string | no | Max 200 chars |
| message | string | yes | 1-5000 chars |

**Response 201:**
```json
{ "success": true, "message": "Inquiry submitted successfully" }
```

**Response 400:** `{ "error": "Validation failed", "code": "VALIDATION_ERROR", "details": [...] }`

**Response 429:** `{ "error": "Too many requests", "code": "RATE_LIMITED" }`

---

### 6.2 Shop Endpoints

#### GET /api/cart

Retrieve current cart. Cart is stored in a cookie/session.

**Response 200:**
```json
{
  "id": "cart_uuid",
  "items": [
    {
      "id": "item_uuid",
      "product_id": "uuid",
      "title": "Mountain Dawn Print 8×10",
      "price": 4500,
      "quantity": 2,
      "image": "https://cdn.example.com/products/mountain-dawn-8x10.jpg",
      "inventory_count": 15
    }
  ],
  "subtotal": 9000,
  "item_count": 2
}
```

---

#### POST /api/cart

Add or update cart item.

**Request body:**
```json
{
  "product_id": "uuid",
  "quantity": 2
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| product_id | uuid | yes | Product to add |
| quantity | int | yes | Quantity (0 to remove) |

**Response 200:** Updated cart (same format as GET /api/cart)

**Response 400:** `{ "error": "Product not found", "code": "INVALID_PRODUCT" }`

**Response 400:** `{ "error": "Insufficient inventory", "code": "OUT_OF_STOCK" }`

---

#### DELETE /api/cart/:item_id

Remove item from cart.

**Response 200:** Updated cart

**Response 404:** `{ "error": "Cart item not found", "code": "NOT_FOUND" }`

---

#### POST /api/checkout

Create Stripe checkout session.

**Request body:**
```json
{
  "email": "buyer@example.com",
  "shipping_country": "US"
}
```

**Response 200:**
```json
{
  "checkout_url": "https://checkout.stripe.com/c/pay/cs_xxx",
  "session_id": "cs_xxx"
}
```

**Response 400:** `{ "error": "Cart is empty", "code": "EMPTY_CART" }`

**Response 400:** `{ "error": "Shipping not available to this country", "code": "INVALID_SHIPPING" }`

---

#### POST /api/webhooks/stripe

Handle Stripe webhook events. Verifies signature from `stripe-signature` header.

**Events handled:**
- `checkout.session.completed` → Create order, decrement inventory, send confirmation email
- `payment_intent.payment_failed` → Log failure, notify admin

**Response 200:** `{ "received": true }`

**Response 400:** `{ "error": "Invalid signature", "code": "INVALID_SIGNATURE" }`

---

#### GET /api/shipping-zones

List available shipping zones and rates.

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Domestic (US)",
      "countries": ["US"],
      "base_rate": 800,
      "per_item_rate": 200,
      "free_threshold": 10000,
      "estimated_days": "3-5 business days"
    },
    {
      "id": "uuid",
      "name": "International",
      "countries": ["*"],
      "base_rate": 2500,
      "per_item_rate": 500,
      "free_threshold": null,
      "estimated_days": "7-14 business days"
    }
  ]
}
```

---

### 6.3 Admin Endpoints

All admin endpoints require authentication via `Authorization: Bearer <token>` header.

**Response 401:** `{ "error": "Unauthorized", "code": "UNAUTHORIZED" }`

**Response 403:** `{ "error": "Forbidden", "code": "FORBIDDEN" }`

---

#### POST /api/admin/auth/login

Admin login.

**Request body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "uuid", "email": "admin@example.com", "name": "Admin" },
  "expires_at": "2026-01-19T10:30:00Z"
}
```

**Response 401:** `{ "error": "Invalid credentials", "code": "INVALID_CREDENTIALS" }`

**Response 429:** `{ "error": "Too many attempts", "code": "RATE_LIMITED" }`

---

#### GET /api/admin/dashboard

Dashboard summary stats.

**Response 200:**
```json
{
  "orders": {
    "pending": 3,
    "this_month": 12,
    "revenue_this_month": 54000
  },
  "inventory": {
    "low_stock_count": 2,
    "out_of_stock_count": 0
  },
  "inquiries": {
    "unread": 5
  },
  "recent_orders": [
    { "id": "uuid", "order_number": "MM-2026-0042", "total": 8500, "status": "paid", "created_at": "2026-01-17T14:20:00Z" }
  ]
}
```

---

#### CRUD /api/admin/artwork

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/artwork | List all artwork (with drafts) |
| GET | /api/admin/artwork/:id | Get single artwork |
| POST | /api/admin/artwork | Create artwork |
| PATCH | /api/admin/artwork/:id | Update artwork |
| DELETE | /api/admin/artwork/:id | Delete artwork |

**POST/PATCH Request body:**
```json
{
  "title": "Mountain Dawn",
  "slug": "mountain-dawn",
  "description": "Inspired by...",
  "category_id": "uuid",
  "medium": "Digital",
  "dimensions": "18 × 24 inches",
  "year": 2025,
  "images": ["https://cdn.example.com/art/mountain-dawn.jpg"],
  "featured": true,
  "display_order": 1
}
```

---

#### CRUD /api/admin/products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/products | List all products (including inactive) |
| GET | /api/admin/products/:id | Get single product |
| POST | /api/admin/products | Create product |
| PATCH | /api/admin/products/:id | Update product |
| DELETE | /api/admin/products/:id | Delete product |

**POST/PATCH Request body:**
```json
{
  "title": "Mountain Dawn Print 8×10",
  "slug": "mountain-dawn-print-8x10",
  "description": "Archival giclée print...",
  "artwork_id": "uuid",
  "category_id": "uuid",
  "price": 4500,
  "compare_at_price": null,
  "inventory_count": 15,
  "sku": "MD-PRINT-8X10",
  "images": ["https://cdn.example.com/products/mountain-dawn-8x10.jpg"],
  "weight_oz": 4.5,
  "active": true,
  "featured": false
}
```

---

#### CRUD /api/admin/categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/categories | List all categories |
| POST | /api/admin/categories | Create category |
| PATCH | /api/admin/categories/:id | Update category |
| DELETE | /api/admin/categories/:id | Delete category (fails if in use) |

---

#### GET /api/admin/orders

List orders with filtering.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| status | string | — | Filter by status |
| page | int | 1 | Page number |
| limit | int | 20 | Items per page |

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "order_number": "MM-2026-0042",
      "email": "buyer@example.com",
      "name": "Jane Doe",
      "total": 8500,
      "status": "paid",
      "item_count": 2,
      "created_at": "2026-01-17T14:20:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 }
}
```

---

#### GET /api/admin/orders/:id

Get full order details.

**Response 200:**
```json
{
  "id": "uuid",
  "order_number": "MM-2026-0042",
  "email": "buyer@example.com",
  "name": "Jane Doe",
  "shipping_address": {
    "street": "123 Main St",
    "city": "Portland",
    "state": "OR",
    "postal": "97201",
    "country": "US"
  },
  "line_items": [
    {
      "product_id": "uuid",
      "title": "Mountain Dawn Print 8×10",
      "price": 4500,
      "quantity": 1,
      "image": "https://cdn.example.com/products/mountain-dawn-8x10.jpg"
    }
  ],
  "subtotal": 4500,
  "shipping_cost": 800,
  "tax": 0,
  "total": 5300,
  "status": "paid",
  "stripe_payment_id": "pi_xxx",
  "tracking_number": null,
  "notes": null,
  "created_at": "2026-01-17T14:20:00Z",
  "updated_at": "2026-01-17T14:20:00Z"
}
```

---

#### PATCH /api/admin/orders/:id

Update order status or add tracking.

**Request body:**
```json
{
  "status": "shipped",
  "tracking_number": "1Z999AA10123456784",
  "notes": "Shipped via UPS Ground"
}
```

**Response 200:** Updated order

---

#### GET /api/admin/inquiries

List inquiries.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| status | string | — | Filter by status (new/read/replied) |
| page | int | 1 | Page number |
| limit | int | 20 | Items per page |

---

#### PATCH /api/admin/inquiries/:id

Update inquiry status.

**Request body:**
```json
{
  "status": "replied"
}
```

---

#### CRUD /api/admin/shipping-zones

Manage shipping zones (same pattern as categories).

---

#### GET /api/admin/site-config

Get all site settings.

#### PATCH /api/admin/site-config

Update site settings.

**Request body:**
```json
{
  "site_title": "maura maura studio",
  "about_text": "Artist bio here...",
  "contact_email": "hello@example.com"
}
```

## 8. Pages

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

## 9. Work Breakdown

See **[TASKS.md](./TASKS.md)** for the complete task breakdown organized by phase.

**Quick links:**
- [Phase 1: Foundation](./TASKS.md#phase-1-foundation) - Project setup, database, auth, layouts
- [Phase 2: Portfolio](./TASKS.md#phase-2-portfolio) - Categories, artwork, gallery
- [Phase 3: E-commerce](./TASKS.md#phase-3-e-commerce) - Products, cart, checkout, orders
- [Phase 4: Testing & Docs](./TASKS.md#phase-4-integration-testing--documentation) - E2E tests, API docs
- [Phase 5: Polish & Launch](./TASKS.md#phase-5-polish--launch) - SEO, performance, deployment

## 10. Deployment Considerations

**Hosting:** DreamHost

**Database:** Supabase or Neon for managed PostgreSQL

**Images:** Cloudinary for automatic optimization and resizing, or S3 + CloudFront

**Domain:** Connect existing registered domain via DNS

**SSL:** Automatic via DreamHost (Let's Encrypt)

**Backups:** Automated database backups via hosting provider

## 11. Success Criteria

- Portfolio displays artwork beautifully across all devices
- Visitors can browse, add to cart, and complete purchases smoothly
- Admin can easily upload new work and manage products/orders
- Site loads quickly with optimized images
- SEO enables discovery through search engines
- Payment processing is secure and reliable