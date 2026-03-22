# Implementation Plan: Photographer Portfolio (Snapfolio)

## Overview

Angular 21 SSR, fully frontend-only. All data hardcoded in `portfolio.data.ts`. Mobile-first SCSS with breakpoint mixins. `NgOptimizedImage` for all images. Standalone lazy-loaded components. Property-based tests use fast-check (24 properties).

## Tasks

- [x] 1. Set up project foundation
  - [x] 1.1 Install `fast-check` as a dev dependency (`npm install --save-dev fast-check`)
  - [x] 1.2 Add SCSS breakpoint variables (`$bp-tablet: 768px`, `$bp-desktop: 1280px`) and `@mixin tablet` / `@mixin desktop` mixins to `src/styles.scss`
  - [x] 1.3 Create `src/app/core/data/portfolio.data.ts` with all TypeScript interfaces (`Photo`, `Testimonial`, `Service`, `WorkCategory`, `AboutContent`, `PhilosophyContent`) and all hardcoded data constants (12 photos, testimonials, services, work categories, about content, philosophy content)
  - [x] 1.4 Create `src/app/core/services/portfolio.service.ts` as `@Injectable({ providedIn: 'root' })` wrapping the data constants as readonly properties — no `HttpClient`, no async
  - [x] 1.5 Configure `src/app/app.routes.ts` with lazy-loaded routes: `''` → `HomeComponent`, `'gallery'` → `GalleryComponent`, `'about'` → `AboutComponent`, `'contact'` → `ContactComponent`, `'**'` → redirectTo `''`
  - [x] 1.6 Confirm `src/app/app.routes.server.ts` uses `RenderMode.Prerender` for `**` (already scaffolded — verify and adjust if needed)
  - _Requirements: 17.1–17.8_

- [x] 2. Build app shell
  - [x] 2.1 Update `src/app/app.ts` to import and compose `HeaderComponent`, `RouterOutlet`, and `FooterComponent` in the root template
  - [x] 2.2 Create `src/app/shared/header/header.component.ts` — standalone; logo as `routerLink="/"`, nav links (Home `/`, Gallery `/gallery`, About `/about`, Contact `/contact`) with `RouterLinkActive` and `[routerLinkActiveOptions]="{exact:true}"` on Home; boolean signal `menuOpen`; hamburger button with `aria-label="Open navigation menu"`; mobile overlay toggled via CSS class; close menu on `NavigationEnd`
  - [ ]* 2.3 Write property test for active nav link class (Property 10) and hamburger menu state (Property 11)
    - **Property 10: Active navigation link class**
    - **Property 11: Hamburger menu open/close state**
    - **Validates: Requirements 1.5, 1.7, 1.8**
  - [x] 2.4 Create `src/app/shared/footer/footer.component.ts` — standalone; brand name, nav links, Instagram and WhatsApp social icon links with `aria-label`, `target="_blank"`, `rel="noopener noreferrer"`; copyright year via `new Date().getFullYear()`
  - [ ]* 2.5 Write property test for footer social links (Property 18) and copyright year (Property 19)
    - **Property 18: Footer social links have aria-label and open in new tab**
    - **Property 19: Footer copyright contains current year**
    - **Validates: Requirements 10.5, 10.6, 13.6**
  - _Requirements: 1.1–1.9, 10.1–10.7_

- [x] 3. Build home page sections
  - [x] 3.1 Create `src/app/pages/home/sections/hero/hero.component.ts` — full-viewport background image via CSS `background-image` inline style binding; photographer name + tagline overlay with `clamp()` fluid typography; primary CTA (→ `/gallery`) and secondary CTA (→ `/contact`) buttons; add `<link rel="preload">` for hero image via Angular `Meta` service to satisfy priority loading (Req 12.2); wrap any `document`/`window` access in `isPlatformBrowser` guard
  - [x] 3.2 Create `src/app/pages/home/sections/featured-work/featured-work.component.ts` — grid of 6 `featured: true` photos; each card shows title + category label; click navigates to `/gallery?category=X`; "View Full Gallery" link to `/gallery`; use `NgOptimizedImage` for card images
  - [ ]* 3.3 Write property test for featured photo count (Property 2) and featured card rendering (Property 3) and category navigation query param (Property 4)
    - **Property 2: Featured work minimum count**
    - **Property 3: Featured photo card renders title and category**
    - **Property 4: Category filter click navigates with correct query param**
    - **Validates: Requirements 3.1, 3.2, 3.3**
  - [x] 3.4 Create `src/app/pages/home/sections/philosophy/philosophy.component.ts` — section heading, body text, supporting image (`about-mountain.jpg`) via `NgOptimizedImage` with descriptive `alt` text; two-column layout at tablet+, stacked on mobile
  - [x] 3.5 Create `src/app/pages/home/sections/our-work/our-work.component.ts` — `WorkCategoryCard` for each of the 4 categories (cover image via `NgOptimizedImage` + category name + `routerLink` to `/gallery?category=X`); "View All" link to `/gallery`; single-column on mobile, multi-column at tablet+
  - [ ]* 3.6 Write property test for Our Work category cards (Property 21)
    - **Property 21: Our Work section category cards completeness**
    - **Validates: Requirements 16.2, 16.3, 16.4**
  - [x] 3.7 Create `src/app/pages/home/sections/services/services.component.ts` — service cards (icon via `NgOptimizedImage` + title + description); single-column on mobile, multi-column at tablet+
  - [ ]* 3.8 Write property test for services data completeness (Property 5)
    - **Property 5: Services data completeness**
    - **Validates: Requirements 4.1**
  - [x] 3.9 Create `src/app/pages/home/sections/testimonials/testimonials.component.ts` — testimonial cards (quote, client name, star rating, optional circular avatar via `NgOptimizedImage` with `alt` containing client name); single-column on mobile
  - [ ]* 3.10 Write property test for testimonials rendering (Property 6) and avatar alt text (Property 20)
    - **Property 6: Testimonials data completeness and rendering**
    - **Property 20: Testimonial avatar alt text identifies client**
    - **Validates: Requirements 9.1, 9.2, 9.4, 13.7**
  - [x] 3.11 Create `src/app/pages/home/sections/cta/cta.component.ts` — headline, supporting text, Contact button (→ `/contact`)
  - [x] 3.12 Create `src/app/pages/home/home.component.ts` composing all seven sections in order: Hero → Featured Work → Philosophy → Our Work → Services → Testimonials → CTA; set page `<title>` and `<meta name="description">` and Open Graph tags via `Title` and `Meta` services
  - _Requirements: 2.1–2.4, 3.1–3.5, 4.1–4.3, 5.1–5.3, 9.1–9.5, 12.4, 14.5–14.9, 15.1–15.6, 16.1–16.6_

- [x] 4. Build Gallery page
  - [x] 4.1 Create `src/app/pages/gallery/gallery.component.ts` — standalone; inject `ActivatedRoute` and read `snapshot.queryParams['category']` on init to pre-select filter (works on SSR); `activeCategory` signal defaulting to `'All'`; computed `filteredPhotos` signal; category filter buttons (All + one per category) with active visual state
  - [ ]* 4.2 Write property test for gallery filter correctness (Property 1)
    - **Property 1: Gallery filter correctness**
    - **Validates: Requirements 6.1, 6.3, 6.4**
  - [x] 4.3 Render photo grid with `NgOptimizedImage` for each photo; descriptive `alt` text from `photo.title`; responsive CSS grid (1 col mobile → 2 col tablet → 4 col desktop) using breakpoint mixins; set page `<title>` and `<meta name="description">` and Open Graph tags
  - [ ]* 4.4 Write property test for photo alt text non-empty (Property 16)
    - **Property 16: Photo alt text non-empty**
    - **Validates: Requirements 13.1**
  - [x] 4.5 Create `src/app/shared/lightbox/lightbox.component.ts` — standalone; `@Input() photos: Photo[]`, `@Input() activeIndex: number`, `@Output() close`; `@HostListener('document:keydown.escape')` closes; arrow keys navigate; focus close button on open; return focus to triggering element on close; scroll lock via `document.body.style.overflow` wrapped in `isPlatformBrowser` guard; backdrop click closes; caption shows `photo.title` + `photo.category`; prev/next buttons disabled at boundaries; `NgOptimizedImage` for displayed photo
  - [ ]* 4.6 Write property test for lightbox index (Property 12), close events (Property 13), and caption rendering (Property 14)
    - **Property 12: Lightbox opens on photo click**
    - **Property 13: Lightbox closes on Escape key or backdrop click**
    - **Property 14: Lightbox caption displays photo metadata**
    - **Validates: Requirements 7.1, 7.3, 7.4, 7.6**
  - [x] 4.7 Integrate `LightboxComponent` into `GalleryComponent` — `lightboxIndex` signal; open on photo click (store reference to clicked element); close returns focus to that element; pass `filteredPhotos` and `lightboxIndex` as inputs
  - _Requirements: 6.1–6.6, 7.1–7.6, 12.1, 13.1–13.3, 14.2–14.4_

- [ ] 5. Checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Build About page
  - [x] 6.1 Create `src/app/pages/about/about.component.ts` — standalone; profile image (`photo-image-1.JPG`) via `NgOptimizedImage` with `priority` attribute; biography text; specialties list; stats (years experience, completed projects, satisfied clients); set page `<title>`, `<meta name="description">`, and Open Graph tags via `Title` and `Meta` services
  - [ ]* 6.2 Write property test for about page specialties (Property 15)
    - **Property 15: About page specialties rendered**
    - **Validates: Requirements 8.4**
  - _Requirements: 8.1–8.6, 12.1, 12.4_

- [x] 7. Build Contact page
  - [x] 7.1 Create `src/app/pages/contact/contact.component.ts` — standalone; reactive form via `FormBuilder` with controls: `name` (`Validators.required`), `email` (`Validators.required`, `Validators.email`), `subject` (`Validators.required`), `message` (`Validators.required`); each field has `<label for="...">` with matching `id`; Instagram and WhatsApp social links; set page `<title>`, `<meta name="description">`, and Open Graph tags
  - [x] 7.2 Implement client-side-only submission: valid → set `submitted` signal to `true`, show success message, no `HttpClient`; invalid → mark all controls touched, show inline validation errors per field
  - [ ]* 7.3 Write property test for contact form required field validation (Property 7) and email format validation (Property 8)
    - **Property 7: Contact form validation — required fields**
    - **Property 8: Contact form validation — email format**
    - **Validates: Requirements 11.4, 11.5**
  - [ ]* 7.4 Write property test for contact form success without HTTP (Property 9)
    - **Property 9: Contact form success — no HTTP call**
    - **Validates: Requirements 11.3, 11.7**
  - [ ]* 7.5 Write property test for contact form fields having associated labels (Property 17)
    - **Property 17: Contact form fields have associated labels**
    - **Validates: Requirements 13.5**
  - _Requirements: 11.1–11.7, 12.4, 13.5_

- [x] 8. Data integrity and SSR polish
  - [x] 8.1 Audit all components for `document`/`window`/`localStorage` access and wrap each in `isPlatformBrowser(this.platformId)` or `afterNextRender()` — specifically: scroll lock in `LightboxComponent`, focus management in `LightboxComponent` and `HeaderComponent`, `NavigationEnd` subscription in `HeaderComponent`
  - [ ]* 8.2 Write property test for data integrity across all data arrays (Property 22) and no external image URLs (Property 23)
    - **Property 22: Data integrity — all data items have required fields**
    - **Property 23: No external image URLs in data**
    - **Validates: Requirements 17.1–17.6**
  - [ ]* 8.3 Write property test for page meta tags per route (Property 24)
    - **Property 24: Page meta tags set per route**
    - **Validates: Requirements 12.4**
  - _Requirements: 12.3, 12.4, 17.7, 17.8_

- [x] 9. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each property test sub-task references the exact property number from `design.md`
- `fast-check` must be installed (task 1.1) before any property test tasks are executed
- SSR platform guards are required in `LightboxComponent` (scroll lock) and `HeaderComponent` (NavigationEnd, focus) — called out explicitly in tasks 4.5 and 8.1
- No `HttpClient` import anywhere in the app — contact form submission is entirely client-side
- All images served from `src/assets/images/` via `NgOptimizedImage`; hero background uses CSS `background-image` with a `<link rel="preload">` for priority loading
