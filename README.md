<div align="center">

# Lumière · Fine Jewelry

**A jewelry storefront built with Next.js, React, TypeScript, and Supabase.**

Responsive commerce interfaces, thoughtful product interactions, and an authentication flow in one frontend portfolio project.

[Explore the code](#engineering-highlights) · [Run locally](#run-locally) · [Developer](https://github.com/farnazbina)

<img src="public/images/luxury-banner.png" alt="Lumière campaign image featuring gold jewelry against a warm, dark backdrop" width="100%" />

</div>

## The project

Lumière brings a fine-jewelry brand to the web through warm neutrals, burgundy accents, editorial imagery, and spacious layouts. The experience spans collection discovery, product exploration, a cart prototype, and a three-step checkout interface.

Built as a frontend portfolio project, it demonstrates component composition, responsive design, typed data modeling, interactive React state, and Supabase authentication. Commerce screens currently use demo data; the repository also includes a PostgreSQL schema for future backend integration.

## Experience at a glance

| Area | What's implemented |
| --- | --- |
| Homepage | Rotating hero carousel, category navigation, best sellers, campaign banner, and testimonials |
| Catalog | Category and price filters, sorting, grid/list views, mobile filter panel, and empty results state |
| Product details | Selectable image gallery, pointer-based hover zoom, quantity selector, information tabs, and related products |
| Cart | Dedicated page with local quantity updates, item removal, calculated totals, demo coupon behavior, and an empty state; separate responsive cart drawer |
| Checkout prototype | Address selection, payment-method selection, order review, and a confirmation dialog |
| Authentication | Supabase sign-up, login, email confirmation, password recovery, and password update flows |
| Database foundation | SQL tables for profiles, products, categories, carts, favorites, orders, order items, and transactions, with row-level security policies |

## Visual direction

These are actual image assets used throughout the storefront.

<img src="public/images/hero-rings.png" alt="Homepage hero artwork showing sculptural gold rings on sunlit stone" width="100%" />

| Collection imagery | Product imagery |
| :---: | :---: |
| <img src="public/images/categories/necklaces.png" alt="Layered necklaces used in the collection section" width="360" /> | <img src="public/images/products/twist-ring.png" alt="Lumière Twist Ring used in the product catalog" width="360" /> |

## Engineering highlights

- **Reusable commerce components.** Shared catalog data and product types support the listing, detail, cart, and review screens. Checkout steps reuse progress and order-summary components.
- **Responsive interaction design.** Desktop filters become a mobile panel, the cart drawer becomes a bottom sheet on smaller screens, and product layouts adapt across breakpoints.
- **Focused React state.** Catalog filtering and sorting use derived values; the cart page calculates totals from its local items. Product galleries and checkout controls keep interaction state close to their components.
- **Next.js application structure.** App Router routes organize the storefront and authentication pages, while `next/image` provides responsive image sizing and priority loading for featured imagery.
- **Authentication boundaries.** Separate browser and server Supabase clients, cookie-based session handling, and an email-confirmation route support the account lifecycle.
- **Database access rules in source control.** The SQL schema defines customer ownership and administrator policies, making the intended data-access model reviewable alongside the frontend.

### Start your code review here

| Code | What to look for |
| --- | --- |
| [ShopCatalog.tsx](components/shop/ShopCatalog.tsx) | Filter composition, sorting, category query-parameter support, and responsive view controls |
| [ProductDetails.tsx](components/shop/ProductDetails.tsx) | Gallery state, pointer-position zoom, and product presentation |
| [CartPage.tsx](components/cart/CartPage.tsx) | Quantity updates, derived totals, removal, and empty-cart handling |
| [Checkout components](components/checkout) | Composition across address, payment, and review steps |
| [Supabase clients](lib/supabase) | Browser/server client separation and session handling |
| [Database schema](supabase/schema.sql) | Relational modeling and row-level security policies |

## Tech stack

| Purpose | Tools |
| --- | --- |
| Application | Next.js App Router, React 19, TypeScript |
| Styling | Tailwind CSS, CSS variables, tailwindcss-animate |
| UI primitives and icons | Radix UI, Lucide, React Icons |
| Authentication and database foundation | Supabase Auth, PostgreSQL, Supabase SSR |
| Code quality | ESLint, TypeScript |
| Package management | pnpm with a committed lockfile |

## Run locally

Use a current Node.js LTS release, pnpm, and a Supabase project for authentication.

```bash
git clone https://github.com/farnazbina/nextjs-e-commerce.git
cd nextjs-e-commerce
pnpm install
```

Create `.env.local` in the project root with your Supabase project's public connection values:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

For local authentication, configure your Supabase Auth site URL as `http://localhost:3000` and allow `http://localhost:3000/auth/update-password` as a redirect URL. Email confirmation is handled by the route in [app/auth/confirm/route.ts](app/auth/confirm/route.ts); confirmation emails using this route need `token_hash` and `type` query parameters.

To provision the commerce database foundation, run [supabase/schema.sql](supabase/schema.sql) once in a fresh Supabase project's SQL Editor. The storefront's demo catalog does not depend on these tables yet.

```bash
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Browse `/products`, open `/products/1`, explore `/cart`, and follow `/submit-order` through the checkout prototype. Account flows begin at `/auth/login` and `/auth/sign-up`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm lint` | Run ESLint |
| `pnpm exec tsc --noEmit` | Check TypeScript types |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |

## Project structure

```text
app/
  (store)/          Storefront, products, cart, and checkout routes
  auth/             Account pages and email confirmation
  protected/        Protected starter page
components/
  home/             Homepage sections
  shop/             Catalog, filters, and product details
  cart/             Interactive cart page
  checkout/         Address, payment, review, and shared summaries
  auth/             Authentication components
  layout/           Header, footer, and cart drawer
  ui/               Shared UI primitives
lib/
  data/             Typed demo catalog and checkout fixtures
  supabase/         Browser/server clients and session handling
public/images/      Hero, category, product, and testimonial assets
supabase/           SQL schema, migrations, and local configuration
```

## Current scope and next steps

The storefront and checkout are a UI prototype with working local interactions. Product add-to-cart and favorites controls are not connected to persistence; the cart drawer, cart page, and checkout do not share synchronized state. Checkout uses sample addresses and totals, and confirmation does not create an order or process a payment.

The database schema provides a foundation for commerce data, but customer order history and admin dashboards are not implemented. Next steps are to connect the catalog to Supabase, persist a shared cart, implement order creation, and add integration tests for the complete shopping flow.

## Developer

Built by [@farnazbina](https://github.com/farnazbina).

For frontend opportunities or a discussion of the implementation, visit my [GitHub profile](https://github.com/farnazbina). This repository showcases my work with React, Next.js, TypeScript, responsive interfaces, and Supabase integration.
