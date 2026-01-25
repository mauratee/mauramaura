# Work Breakdown - Task List

> This file contains the detailed task breakdown for the Creative Portfolio & Shop project.
> See [PRD.md](./PRD.md) for project overview, architecture, and data models.

## Table of Contents

- [Phase 1: Foundation](#phase-1-foundation) (Tasks 1.1.x - 1.7.x)
- [Phase 2: Portfolio](#phase-2-portfolio) (Tasks 2.1.x - 2.5.x)
- [Phase 3: E-commerce](#phase-3-e-commerce) (Tasks 3.1.x - 3.8.x)
- [Phase 4: Integration Testing & Documentation](#phase-4-integration-testing--documentation) (Tasks 4.1.x - 4.2.x)
- [Phase 5: Polish & Launch](#phase-5-polish--launch) (Tasks 5.1.x - 5.7.x)

---

**Status values:** `TODO` | `IN_PROGRESS` | `FINISHED`

---

## Phase 1: Foundation

---

### Task 1.1.1: Initialize Next.js Project [FINISHED]

```
Category:     Project Setup
Description:  Create the foundational Next.js 14+ project with TypeScript
              and App Router configuration.

Steps to Verify:
  - package.json exists with next, react, react-dom, typescript
  - tsconfig.json exists with strict mode enabled
  - src/app directory exists with layout.tsx and page.tsx
  - pnpm install completes without errors
  - pnpm run dev starts development server on localhost:3000
  - pnpm run build compiles successfully


```

---

### Task 1.1.2: Configure Tailwind CSS [FINISHED]

```
Category:     Project Setup
Description:  Set up Tailwind CSS with custom theme matching DESIGN.md
              (colors, fonts, spacing scale).

Steps to Verify:
  - tailwind.config.ts exists with custom theme
  - Colors defined: background (#FAFAF9), surface (#F5F5F4), border (#E7E5E4)
  - Text colors defined (both warm neutral and midnight blue options)
  - Spacing scale matches DESIGN.md (4, 8, 16, 24, 32, 48, 64, 96, 128px)
  - Font families configured (Inter/DM Sans)
  - globals.css imports Tailwind directives
  - Test component renders with custom colors correctly


```

---

### Task 1.1.3: Configure Linting and Formatting [FINISHED]

```
Category:     Project Setup
Description:  Set up ESLint, Prettier, and TypeScript strict mode for
              consistent code quality.

Steps to Verify:
  - .eslintrc.json exists with Next.js and TypeScript rules
  - .prettierrc exists with consistent formatting rules
  - tsconfig.json has "strict": true
  - pnpm run lint passes without errors
  - Editor shows lint errors for violations


```

---

### Task 1.1.4: Create Folder Structure [FINISHED]

```
Category:     Project Setup
Description:  Create the project folder structure per PRD specifications.

Steps to Verify:
  - src/app/ exists (Next.js App Router pages)
  - src/app/(public)/ exists for public routes
  - src/app/admin/ exists for admin routes
  - src/app/api/ exists for API route handlers
  - src/components/ exists with subdirectories: ui/, layout/, artwork/, shop/, admin/
  - src/lib/ exists for utilities (db.ts, stripe.ts, auth.ts)
  - src/types/ exists for TypeScript type definitions
  - prisma/ exists for database schema


```

---

### Task 1.1.5: Set Up Environment Variables [FINISHED]

```
Category:     Project Setup
Description:  Create environment variables structure with example file
              and type definitions.

Steps to Verify:
  - .env.example exists with all required variables (no secrets)
  - .env.local is gitignored
  - Variables include: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
  - Variables include: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
  - Variables include: CLOUDINARY_* or AWS_* for image storage
  - Application fails gracefully if required vars are missing


```

---

### Task 1.2.1: Install and Configure Prisma [FINISHED]

```
Category:     Database Setup
Description:  Install Prisma ORM and configure for PostgreSQL.

Steps to Verify:
  - prisma package installed as dev dependency
  - @prisma/client installed as dependency
  - prisma/schema.prisma exists with PostgreSQL provider
  - DATABASE_URL environment variable configured
  - pnpm prisma --help runs successfully


```

---

### Task 1.2.2: Create Prisma Schema [FINISHED]

```
Category:     Database Setup
Description:  Define all data models in Prisma schema per PRD Section 5.

Steps to Verify:
  - AdminUser model defined with all fields from PRD
  - Category model defined with all fields
  - Artwork model defined with Category relation
  - Product model defined with optional Artwork relation
  - ShippingZone model defined
  - Order model defined with ShippingZone relation
  - Inquiry model defined
  - SiteConfig model defined
  - All enums defined (OrderStatus, InquiryStatus)
  - pnpm prisma validate passes


```

---

### Task 1.2.3: Run Initial Migration [FINISHED]

```
Category:     Database Setup
Description:  Generate and run initial database migration.

Steps to Verify:
  - pnpm prisma migrate dev --name init completes successfully
  - prisma/migrations/ directory contains migration files
  - All tables created in database
  - pnpm prisma migrate status shows no pending migrations


```

---

### Task 1.2.4: Create Seed Script [FINISHED]

```
Category:     Database Setup
Description:  Create database seed script with sample data for
              development and testing.

Steps to Verify:
  - prisma/seed.ts exists
  - Seed creates: 1 admin user, 3+ categories, 5+ artworks, 5+ products
  - Seed creates: 2+ shipping zones, sample site config
  - package.json has prisma.seed configuration
  - pnpm prisma db seed runs without errors
  - Data visible in database after seeding


```

---

### Task 1.3.1: Install NextAuth.js [TODO]

```
Category:     Authentication
Description:  Install and configure NextAuth.js for admin authentication.

Steps to Verify:
  - next-auth package installed
  - src/app/api/auth/[...nextauth]/route.ts exists
  - src/lib/auth.ts exports auth configuration
  - NEXTAUTH_SECRET and NEXTAUTH_URL set in environment


```

---

### Task 1.3.2: Create Credentials Provider [TODO]

```
Category:     Authentication
Description:  Implement credentials provider for admin email/password
              login using AdminUser model.

Steps to Verify:
  - Credentials provider configured in NextAuth
  - Password hashing uses bcrypt
  - Login validates against AdminUser table
  - Invalid credentials return appropriate error
  - Successful login returns user object (id, email, name)


```

---

### Task 1.3.3: Build Login Page [TODO]

```
Category:     Authentication
Description:  Create admin login page with email/password form.

Steps to Verify:
  - /admin/login page exists and renders form
  - Form includes email and password fields
  - Form shows validation errors for empty fields
  - Form shows error message for invalid credentials
  - Successful login redirects to /admin
  - Page styled according to DESIGN.md


```

---

### Task 1.3.4: Create Auth Middleware [TODO]

```
Category:     Authentication
Description:  Create middleware to protect all /admin routes.

Steps to Verify:
  - src/middleware.ts exists
  - Unauthenticated requests to /admin/* redirect to /admin/login
  - Unauthenticated requests to /api/admin/* return 401
  - Authenticated requests proceed normally
  - /admin/login is accessible without authentication


```

---

### Task 1.3.5: Add Login Rate Limiting [TODO]

```
Category:     Authentication
Description:  Implement rate limiting on login endpoint to prevent
              brute force attacks.

Steps to Verify:
  - Rate limiter configured for /api/auth/callback/credentials
  - Limit: 5 attempts per 15 minutes per IP
  - Exceeded limit returns 429 status code
  - Rate limit resets after time window


```

---

### Task 1.4.1: Create Public Layout [TODO]

```
Category:     Layout & Navigation
Description:  Create shared layout component for public pages with
              header and footer.

Steps to Verify:
  - src/app/(public)/layout.tsx exists
  - Header displays logo/site name and navigation links
  - Footer displays copyright, social links
  - Layout applies to all public routes
  - Responsive on mobile, tablet, desktop


```

---

### Task 1.4.2: Build Responsive Navigation [TODO]

```
Category:     Layout & Navigation
Description:  Build responsive navigation with desktop menu and mobile
              hamburger.

Steps to Verify:
  - Desktop: horizontal navigation links visible
  - Mobile: hamburger icon visible, opens slide-out menu
  - Navigation includes: Work, Shop, About, Contact
  - Cart icon with item count visible (shop pages)
  - Active page highlighted in navigation


```

---

### Task 1.4.3: Create Admin Layout [TODO]

```
Category:     Layout & Navigation
Description:  Create admin dashboard layout with sidebar navigation.

Steps to Verify:
  - src/app/admin/layout.tsx exists
  - Sidebar displays navigation: Dashboard, Artwork, Products, Orders, etc.
  - Header displays admin name and logout button
  - Main content area scrolls independently
  - Active section highlighted in sidebar


```

---

### Task 1.4.4: Create Base UI Components [TODO]

```
Category:     Layout & Navigation
Description:  Create reusable base UI components following DESIGN.md.

Steps to Verify:
  - src/components/ui/Button.tsx exists with variants (primary, secondary)
  - src/components/ui/Input.tsx exists with label and error states
  - src/components/ui/Card.tsx exists
  - src/components/ui/Modal.tsx exists with open/close behavior
  - All components styled per DESIGN.md
  - Components are accessible (proper ARIA attributes)


```

---

### Task 1.5.1: Configure Security Headers [TODO]

```
Category:     Security Foundations
Description:  Configure security headers in Next.js config.

Steps to Verify:
  - next.config.js includes security headers
  - Content-Security-Policy header set
  - X-Frame-Options set to DENY
  - X-Content-Type-Options set to nosniff
  - Headers visible in browser dev tools


```

---

### Task 1.5.2: Set Up Rate Limiting [TODO]

```
Category:     Security Foundations
Description:  Implement rate limiting for API endpoints.

Steps to Verify:
  - Rate limiting library installed (upstash/ratelimit or similar)
  - Rate limiter applied to public API endpoints
  - POST /api/inquiries limited to 5/minute
  - Rate limit exceeded returns 429 with Retry-After header


```

---

### Task 1.5.3: Configure Dependabot [TODO]

```
Category:     Security Foundations
Description:  Set up Dependabot for automated dependency vulnerability
              scanning.

Steps to Verify:
  - .github/dependabot.yml exists
  - Configured to check npm dependencies weekly
  - Pull requests created for security updates


```

---

### Task 1.5.4: Add Input Validation with Zod [TODO]

```
Category:     Security Foundations
Description:  Set up Zod for runtime input validation on API endpoints.

Steps to Verify:
  - zod package installed
  - src/lib/validations/ directory exists
  - Validation schemas defined for: inquiry, cart, checkout
  - API endpoints validate input before processing
  - Invalid input returns 400 with detailed error messages


```

---

### Task 1.6.1: Create Docker Configuration [TODO]

```
Category:     DevOps
Description:  Create Docker and docker-compose configuration for local
              development.

Steps to Verify:
  - docker-compose up starts all services (app, database)
  - Application is accessible on configured port
  - Database data persists across restarts


```

---

### Task 1.7.1: Set Up Testing Framework [TODO]

```
Category:     Testing Infrastructure
Description:  Configure Jest and React Testing Library for unit and
              integration tests.

Steps to Verify:
  - Jest installed and configured
  - React Testing Library installed
  - pnpm test runs successfully
  - Coverage reporting configured
  - Test scripts added to package.json


```

---

### Task 1.7.2: Write Unit Tests for Authentication [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for authentication flow and middleware.

Steps to Verify:
  - Tests for credentials provider (valid/invalid login)
  - Tests for auth middleware (protected routes)
  - Tests for rate limiting on login
  - All tests pass


```

---

### Task 1.7.3: Write Unit Tests for Base UI Components [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for reusable UI components.

Steps to Verify:
  - Tests for Button component (variants, states, click handlers)
  - Tests for Input component (validation, error display)
  - Tests for Card component
  - Tests for Modal component (open/close behavior)
  - All tests pass


```

---

## Phase 2: Portfolio

---

### Task 2.1.1: Build Admin Category List Page [TODO]

```
Category:     Category Management
Description:  Create admin page displaying all categories with ability
              to manage them.

Steps to Verify:
  - /admin/categories page exists and renders
  - All categories displayed in a table/list
  - Shows: name, slug, artwork count, display order
  - Edit and Delete buttons for each category
  - "Add Category" button visible


```

---

### Task 2.1.2: Create Category Form [TODO]

```
Category:     Category Management
Description:  Build create/edit form for categories.

Steps to Verify:
  - Form includes: name, slug, description, display_order fields
  - Slug auto-generated from name (editable)
  - Form validates required fields
  - Create mode: saves new category, redirects to list
  - Edit mode: pre-fills existing data, updates on save


```

---

### Task 2.1.3: Implement Category API Endpoints [TODO]

```
Category:     Category Management
Description:  Create CRUD API endpoints for categories.

Steps to Verify:
  - GET /api/admin/categories returns all categories
  - POST /api/admin/categories creates new category
  - PATCH /api/admin/categories/:id updates category
  - DELETE /api/admin/categories/:id deletes category
  - DELETE fails if category has artwork/products (409 Conflict)
  - All endpoints require admin authentication


```

---

### Task 2.2.1: Set Up Image Storage [TODO]

```
Category:     Image Upload Pipeline
Description:  Configure Cloudinary (or S3) for image storage and
              optimization.

Steps to Verify:
  - Cloudinary account created (or S3 bucket configured)
  - API credentials stored in environment variables
  - src/lib/cloudinary.ts exports configured client
  - Test upload works via API
  - Uploaded images accessible via public URL


```

---

### Task 2.2.2: Create Image Upload API [TODO]

```
Category:     Image Upload Pipeline
Description:  Build API endpoint for uploading images to cloud storage.

Steps to Verify:
  - POST /api/upload accepts multipart/form-data
  - Validates file type (jpg, png, webp, gif)
  - Validates file size (max 10MB)
  - Uploads to Cloudinary/S3
  - Returns public URL and metadata
  - Requires admin authentication


```

---

### Task 2.2.3: Build ImageUpload Component [TODO]

```
Category:     Image Upload Pipeline
Description:  Create reusable image upload component with drag-and-drop.

Steps to Verify:
  - src/components/ui/ImageUpload.tsx exists
  - Supports click to browse and drag-and-drop
  - Shows upload progress
  - Displays uploaded image with remove option
  - Supports single or multiple image modes


```

---

### Task 2.3.1: Build Admin Artwork List Page [TODO]

```
Category:     Artwork Admin
Description:  Create admin page displaying all artwork with search,
              filter, and pagination.

Steps to Verify:
  - /admin/artwork page exists and renders
  - Artwork displayed in table or grid view
  - Shows: thumbnail, title, category, featured status, date
  - Search by title works
  - Filter by category works
  - Pagination works (20 items per page)


```

---

### Task 2.3.2: Create Artwork Form [TODO]

```
Category:     Artwork Admin
Description:  Build create/edit form for artwork with all fields.

Steps to Verify:
  - Form includes all fields from Artwork model
  - Image upload integrated via ImageUpload component
  - Category selectable from dropdown
  - Slug auto-generated from title (editable)
  - Featured toggle available
  - Save creates/updates artwork and redirects to list


```

---

### Task 2.3.3: Implement Artwork API Endpoints [TODO]

```
Category:     Artwork Admin
Description:  Create CRUD API endpoints for artwork.

Steps to Verify:
  - GET /api/admin/artwork returns all artwork (paginated)
  - POST /api/admin/artwork creates new artwork
  - PATCH /api/admin/artwork/:id updates artwork
  - DELETE /api/admin/artwork/:id deletes artwork
  - Public GET /api/artwork returns only published artwork
  - Public GET /api/artwork/:slug returns single by slug


```

---

### Task 2.4.1: Build Gallery Page [TODO]

```
Category:     Public Gallery
Description:  Create /work page displaying artwork in responsive grid.

Steps to Verify:
  - /work page exists and renders
  - Artwork displayed in 3-column grid (desktop)
  - Responsive: 2 columns tablet, 1-2 columns mobile
  - Grid layout matches DESIGN.md wireframe
  - Images lazy-loaded below fold


```

---

### Task 2.4.2: Implement Gallery Filtering [TODO]

```
Category:     Public Gallery
Description:  Add category filtering to gallery page.

Steps to Verify:
  - Category filter component displayed above grid
  - "All" shows all artwork
  - Selecting category filters to that category only
  - URL updates with ?category= parameter


```

---

### Task 2.4.3: Build Artwork Detail Page [TODO]

```
Category:     Public Gallery
Description:  Create /work/[slug] page showing full artwork details.

Steps to Verify:
  - /work/[slug] page exists and renders
  - Large image display
  - All metadata displayed (title, description, medium, etc.)
  - Back to gallery link
  - Link to product if available for purchase


```

---

### Task 2.5.1: Write Unit Tests for Category API [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for category CRUD endpoints.

Steps to Verify:
  - Tests for GET /api/categories (public)
  - Tests for admin category CRUD endpoints
  - Tests for delete prevention when category in use
  - All tests pass


```

---

### Task 2.5.2: Write Unit Tests for Artwork API [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for artwork API endpoints.

Steps to Verify:
  - Tests for GET /api/artwork (list, filtering, pagination)
  - Tests for GET /api/artwork/:slug
  - Tests for admin artwork CRUD endpoints
  - Tests cover success and error cases
  - All tests pass


```

---

### Task 2.5.3: Write Unit Tests for Gallery Components [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for gallery and artwork components.

Steps to Verify:
  - Tests for ArtworkCard component
  - Tests for CategoryFilter component
  - Tests for gallery grid layout
  - Tests for artwork detail display
  - All tests pass


```

---

## Phase 3: E-commerce

---

### Task 3.1.1: Build Admin Product List Page [TODO]

```
Category:     Product Management
Description:  Create admin page displaying all products with search,
              filter, and pagination.

Steps to Verify:
  - /admin/products page exists and renders
  - Products displayed in table or grid view
  - Shows: thumbnail, title, price, inventory, category, status
  - Search by title/SKU works
  - Filter by category and active/inactive status works
  - Low stock items highlighted (inventory < 5)


```

---

### Task 3.1.2: Create Product Form [TODO]

```
Category:     Product Management
Description:  Build create/edit form for products with all fields.

Steps to Verify:
  - Form includes all fields from Product model
  - Image upload integrated
  - Category selectable from dropdown
  - Optional artwork linkage via dropdown
  - Price input in dollars (stored as cents)
  - Inventory count input
  - Active/featured toggles


```

---

### Task 3.1.3: Implement Product API Endpoints [TODO]

```
Category:     Product Management
Description:  Create CRUD API endpoints for products.

Steps to Verify:
  - GET /api/admin/products returns all products (paginated)
  - POST /api/admin/products creates new product
  - PATCH /api/admin/products/:id updates product
  - DELETE /api/admin/products/:id deletes product
  - Public GET /api/products returns only active products
  - Public GET /api/products/:slug returns single by slug


```

---

### Task 3.2.1: Build Admin Shipping Zones Page [TODO]

```
Category:     Shipping Configuration
Description:  Create admin page for managing shipping zones and rates.

Steps to Verify:
  - /admin/shipping page exists and renders
  - All shipping zones displayed
  - Shows: name, countries, base rate, active status
  - Edit and Delete buttons for each zone


```

---

### Task 3.2.2: Implement Shipping Calculation [TODO]

```
Category:     Shipping Configuration
Description:  Implement shipping cost calculation based on cart and
              destination country.

Steps to Verify:
  - src/lib/shipping.ts exports calculateShipping function
  - Finds matching zone for destination country
  - Calculates: base_rate + (per_item_rate × quantity)
  - Returns free shipping if subtotal >= free_threshold


```

---

### Task 3.3.1: Implement Cart State Management [TODO]

```
Category:     Shopping Cart
Description:  Set up cart state using cookies for persistence.

Steps to Verify:
  - Cart stored in HTTP-only cookie or server session
  - Cart persists across page refreshes
  - Cart ID generated for anonymous users
  - Cart cleared after successful checkout


```

---

### Task 3.3.2: Build Cart API Endpoints [TODO]

```
Category:     Shopping Cart
Description:  Create API endpoints for cart operations.

Steps to Verify:
  - GET /api/cart returns current cart with items
  - POST /api/cart adds item or updates quantity
  - DELETE /api/cart/:item_id removes item
  - Validates product exists and has inventory
  - Returns error if quantity exceeds inventory


```

---

### Task 3.3.3: Build Cart Page [TODO]

```
Category:     Shopping Cart
Description:  Create /cart page displaying cart contents.

Steps to Verify:
  - /cart page exists and renders
  - Shows all cart items with: image, title, price, quantity
  - Empty cart shows friendly message
  - Quantity can be adjusted
  - Subtotal displayed
  - Checkout button links to payment


```

---

### Task 3.4.1: Set Up Stripe [TODO]

```
Category:     Checkout & Payments
Description:  Configure Stripe account and API keys.

Steps to Verify:
  - Stripe account created
  - API keys stored in environment variables
  - src/lib/stripe.ts exports configured Stripe client


```

---

### Task 3.4.2: Create Checkout API Endpoint [TODO]

```
Category:     Checkout & Payments
Description:  Build API endpoint that creates Stripe Checkout Session.

Steps to Verify:
  - POST /api/checkout creates Stripe session
  - Session includes all cart line items
  - Session includes shipping options from zones
  - Session configured for address collection
  - Returns checkout URL for redirect


```

---

### Task 3.4.3: Build Checkout Success Page [TODO]

```
Category:     Checkout & Payments
Description:  Create /checkout/success page for post-payment.

Steps to Verify:
  - /checkout/success page exists
  - Displays order confirmation with order number
  - Shows order summary (items, total)
  - "Continue Shopping" link
  - Cart cleared on success


```

---

### Task 3.5.1: Set Up Stripe Webhook Endpoint [TODO]

```
Category:     Order Processing
Description:  Create webhook endpoint for Stripe events.

Steps to Verify:
  - POST /api/webhooks/stripe endpoint exists
  - Signature verified using STRIPE_WEBHOOK_SECRET
  - checkout.session.completed event handled
  - Returns 200 for handled events


```

---

### Task 3.5.2: Create Order on Payment Success [TODO]

```
Category:     Order Processing
Description:  Create order record when checkout.session.completed fires.

Steps to Verify:
  - Order created in database with all details
  - Order number generated (MM-2026-0001 format)
  - Customer info saved from Stripe session
  - Line items saved from session
  - Order status set to "paid"
  - Inventory decremented for each item


```

---

### Task 3.6.1: Build Admin Orders List Page [TODO]

```
Category:     Order Management
Description:  Create admin page displaying all orders.

Steps to Verify:
  - /admin/orders page exists and renders
  - Orders displayed in table
  - Shows: order number, customer, total, status, date
  - Filter by status (all/pending/paid/shipped/delivered)
  - Newest orders first


```

---

### Task 3.6.2: Create Order Detail View [TODO]

```
Category:     Order Management
Description:  Build detailed order view for admin.

Steps to Verify:
  - /admin/orders/[id] page exists
  - Shows all order information
  - Shows customer name, email, shipping address
  - Shows line items with images
  - Status can be updated
  - Tracking number can be added


```

---

### Task 3.7.1: Set Up Email Provider [TODO]

```
Category:     Email Notifications
Description:  Configure Resend or SendGrid for transactional email.

Steps to Verify:
  - Email provider account created
  - API key stored in environment variables
  - src/lib/email.ts exports send function
  - Test email sends successfully


```

---

### Task 3.7.2: Send Order Confirmation Email [TODO]

```
Category:     Email Notifications
Description:  Send confirmation email when order placed.

Steps to Verify:
  - Email sent after checkout.session.completed
  - Email includes: order number, items, total, shipping address
  - Email sent to customer email from Stripe


```

---

### Task 3.7.3: Send Shipping Notification Email [TODO]

```
Category:     Email Notifications
Description:  Send email when order marked as shipped.

Steps to Verify:
  - Email sent when status changed to "shipped"
  - Email includes tracking number if provided
  - Only sent once per order


```

---

### Task 3.8.1: Write Unit Tests for Product API [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for product API endpoints.

Steps to Verify:
  - Tests for GET /api/products (list, filtering, pagination)
  - Tests for GET /api/products/:slug
  - Tests for admin product CRUD endpoints
  - Tests cover success and error cases
  - All tests pass


```

---

### Task 3.8.2: Write Unit Tests for Cart API [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for shopping cart endpoints.

Steps to Verify:
  - Tests for GET /api/cart
  - Tests for POST /api/cart (add/update items)
  - Tests for DELETE /api/cart/:item_id
  - Tests for inventory validation
  - All tests pass


```

---

### Task 3.8.3: Write Unit Tests for Checkout [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for checkout and Stripe integration.

Steps to Verify:
  - Tests for POST /api/checkout (session creation)
  - Tests for shipping calculation
  - Tests for empty cart handling
  - All tests pass


```

---

### Task 3.8.4: Write Unit Tests for Stripe Webhooks [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for Stripe webhook handling.

Steps to Verify:
  - Tests for checkout.session.completed event
  - Tests for invalid signature rejection
  - Tests verify order creation
  - Tests verify inventory decrement
  - Tests verify email sending triggered
  - All tests pass


```

---

### Task 3.8.5: Write Unit Tests for Shop Components [TODO]

```
Category:     Unit Testing
Description:  Create unit tests for shop and cart components.

Steps to Verify:
  - Tests for ProductCard component
  - Tests for CartItem component
  - Tests for cart page (item display, quantity)
  - Tests for checkout success page
  - All tests pass


```

---

## Phase 4: Integration Testing & Documentation

---

### Task 4.1.1: Write E2E Tests - Public Flow [TODO]

```
Category:     End-to-End Testing
Description:  Create Playwright or Cypress E2E tests for public user flows.

Steps to Verify:
  - E2E framework installed and configured
  - Test: Browse gallery and view artwork
  - Test: Filter artwork by category
  - Test: Browse shop and view product
  - Test: Add to cart and view cart
  - Test: Submit contact form
  - All tests pass in CI


```

---

### Task 4.1.2: Write E2E Tests - Checkout Flow [TODO]

```
Category:     End-to-End Testing
Description:  Create E2E tests for complete checkout flow.

Steps to Verify:
  - Test: Add items to cart
  - Test: Proceed to checkout
  - Test: Complete Stripe checkout (test mode)
  - Test: Verify success page displays
  - Test: Verify order created in database
  - All tests pass


```

---

### Task 4.1.3: Write E2E Tests - Admin Flow [TODO]

```
Category:     End-to-End Testing
Description:  Create E2E tests for admin dashboard flows.

Steps to Verify:
  - Test: Admin login
  - Test: Create new artwork
  - Test: Create new product
  - Test: View and update order status
  - Test: View and respond to inquiry
  - Test: Logout
  - All tests pass


```

---

### Task 4.2.1: Create API Documentation [TODO]

```
Category:     Documentation
Description:  Write OpenAPI/Swagger specification for all endpoints.

Steps to Verify:
  - OpenAPI spec file exists (openapi.yaml or openapi.json)
  - All public endpoints documented
  - All admin endpoints documented
  - Request/response schemas complete
  - Swagger UI accessible for testing (optional)


```

---

### Task 4.2.2: Create Deployment Guide [TODO]

```
Category:     Documentation
Description:  Write step-by-step deployment guide for DreamHost VPS.

Steps to Verify:
  - Prerequisites listed (Node.js, PostgreSQL, etc.)
  - VPS setup instructions complete
  - Passenger configuration documented
  - Environment variables documented
  - SSL/domain setup documented
  - Troubleshooting section included


```

---

### Task 4.2.3: Create Admin User Guide [TODO]

```
Category:     Documentation
Description:  Write user guide for admin dashboard operations.

Steps to Verify:
  - Login/logout documented
  - Artwork management documented (create, edit, delete)
  - Product management documented
  - Order management documented (status updates, tracking)
  - Inquiry management documented
  - Screenshots included for key flows


```

---

### Task 4.2.4: Write README [TODO]

```
Category:     Documentation
Description:  Create comprehensive README for the repository.

Steps to Verify:
  - Project overview and features
  - Tech stack listed
  - Local development setup instructions
  - Environment variables documented
  - Available scripts documented
  - Deployment instructions or link
  - Contributing guidelines (optional)


```

---

### Task 4.2.5: Document Future Enhancements [TODO]

```
Category:     Documentation
Description:  Create document listing deferred features and future ideas.

Steps to Verify:
  - FUTURE.md or section in README
  - Lists features not in v1 (e.g., customer accounts, wishlists)
  - Includes potential improvements
  - Prioritized or categorized


```

---

## Phase 5: Polish & Launch

---

### Task 5.1.1: Build Contact Page [TODO]

```
Category:     Contact & Inquiries
Description:  Create /contact page with inquiry form.

Steps to Verify:
  - /contact page exists and renders
  - Form includes: name, email, subject (optional), message
  - Validation errors displayed inline
  - Success message shown after submission
  - Spam protection (honeypot field)


```

---

### Task 5.1.2: Build Admin Inquiries Page [TODO]

```
Category:     Contact & Inquiries
Description:  Create admin page for viewing and managing inquiries.

Steps to Verify:
  - /admin/inquiries page exists
  - Lists all inquiries (newest first)
  - Shows: name, email, subject, status, date
  - Filter by status (new/read/replied)
  - Click to view full message


```

---

### Task 5.2.1: Build Home Page [TODO]

```
Category:     Static Pages
Description:  Create homepage with featured artwork and products.

Steps to Verify:
  - / (home) page exists and renders
  - Hero section with featured image and tagline
  - "Selected Work" section with featured artwork
  - "From the Shop" section with featured products
  - Links to /work and /shop


```

---

### Task 5.2.2: Build About Page [TODO]

```
Category:     Static Pages
Description:  Create /about page with artist bio and statement.

Steps to Verify:
  - /about page exists and renders
  - Content pulled from SiteConfig
  - Styled per DESIGN.md
  - Decorative elements from glyph library


```

---

### Task 5.3.1: Configure SEO Metadata [TODO]

```
Category:     SEO & Metadata
Description:  Set up Next.js metadata for all pages.

Steps to Verify:
  - Each page has unique title and description
  - Title format: "Page Name | maura maura studio"
  - OpenGraph and Twitter card tags set
  - Artwork/product pages use appropriate images


```

---

### Task 5.3.2: Generate Sitemap [TODO]

```
Category:     SEO & Metadata
Description:  Create dynamic sitemap.xml for search engines.

Steps to Verify:
  - /sitemap.xml route exists
  - Includes all public pages
  - Includes all artwork and product slugs
  - Updates automatically with new content


```

---

### Task 5.4.1: Optimize Performance [TODO]

```
Category:     Performance Optimization
Description:  Implement performance optimizations for fast loading.

Steps to Verify:
  - Images lazy-loaded below fold
  - Blur placeholders for images
  - Bundle size optimized
  - Lighthouse performance score > 90 (desktop)


```

---

### Task 5.5.1: Set Up Analytics [TODO]

```
Category:     Analytics & Monitoring
Description:  Configure privacy-friendly analytics.

Steps to Verify:
  - Analytics provider configured (Plausible, Fathom, or GA)
  - Page views tracked correctly
  - Dashboard accessible


```

---

### Task 5.5.2: Configure Error Tracking [TODO]

```
Category:     Analytics & Monitoring
Description:  Set up error monitoring with Sentry or similar.

Steps to Verify:
  - Sentry (or alternative) configured
  - Errors in production captured
  - Alert notifications configured


```

---

### Task 5.6.1: Test Mobile & Accessibility [TODO]

```
Category:     Mobile & Accessibility
Description:  Ensure site works well on mobile and is accessible.

Steps to Verify:
  - Tested on iPhone and Android
  - No horizontal scroll
  - All interactive elements keyboard accessible
  - Color contrast meets WCAG AA
  - Skip-to-content link present


```

---

### Task 5.7.1: Configure DreamHost VPS [TODO]

```
Category:     Deployment & Launch
Description:  Set up DreamHost VPS with Node.js and Passenger.

Steps to Verify:
  - VPS provisioned with sufficient resources
  - nvm installed and Node.js 20+ LTS installed
  - Passenger configured in DreamHost panel
  - Application directory created


```

---

### Task 5.7.2: Set Up Production Database [TODO]

```
Category:     Deployment & Launch
Description:  Configure PostgreSQL for production.

Steps to Verify:
  - PostgreSQL configured (VPS or managed service)
  - Production database created
  - DATABASE_URL configured for production
  - Migrations run successfully


```

---

### Task 5.7.3: Configure SSL and Domain [TODO]

```
Category:     Deployment & Launch
Description:  Set up SSL certificate and connect domain.

Steps to Verify:
  - SSL certificate obtained (Let's Encrypt)
  - HTTPS enforced
  - Domain DNS configured
  - Site accessible via domain name


```

---

### Task 5.7.4: Final QA and Launch [TODO]

```
Category:     Deployment & Launch
Description:  Comprehensive testing and go live.

Steps to Verify:
  - All pages load correctly
  - Admin login works
  - Cart and checkout flow works (test purchase)
  - Stripe webhooks received
  - Order created and emails sent
  - Contact form works
  - No console errors
  - Site publicly accessible
  - Celebrate!


```
