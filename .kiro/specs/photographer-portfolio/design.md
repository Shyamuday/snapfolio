# Design Document: Photographer Portfolio (Snapfolio)

## Overview

Snapfolio is an Angular 21 SSR application that serves as a photographer's portfolio website. It is entirely frontend-only — no backend, no HTTP calls, no CMS. All data is hardcoded as TypeScript constants in a dedicated data service. The app pre-renders all static routes at build time using Angular SSR's `RenderMode.Prerender`, ensuring fast initial loads and full SEO support.

The site consists of four routes:
- `/` — Home page (Hero, Featured Work, Philosophy, Our Work, Services, Testimonials, CTA)
- `/gallery` — Filterable photo gallery with lightbox
- `/about` — Photographer biography and stats
- `/contact` — Simulated contact form

All image assets are served from `src/assets/images/`. Angular's `NgOptimizedImage` directive is used for all `<img>` elements to enable lazy loading and automatic size hints.

---

## Architecture

### High-Level Structure

```
src/app/
├── core/
│   ├── data/
│   │   └── portfolio.data.ts          # All hardcoded TypeScript constants
│   └── services/
│       └── portfolio.service.ts       # Provides typed access to data constants
├── shared/
│   ├── header/
│   │   └── header.component.ts
│   ├── footer/
│   │   └── footer.component.ts
│   └── lightbox/
│       └── lightbox.component.ts
├── pages/
│   ├── home/
│   │   ├── home.component.ts
│   │   └── sections/
│   │       ├── hero/
│   │       ├── featured-work/
│   │       ├── philosophy/
│   │       ├── our-work/
│   │       ├── services/
│   │       ├── testimonials/
│   │       └── cta/
│   ├── gallery/
│   │   └── gallery.component.ts
│   ├── about/
│   │   └── about.component.ts
│   └── contact/
│       └── contact.component.ts
├── app.ts
├── app.routes.ts
├── app.routes.server.ts
├── app.config.ts
└── app.config.server.ts
```

### Routing

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component') },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component') },
  { path: 'about', loadComponent: () => import('./pages/about/about.component') },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component') },
  { path: '**', redirectTo: '' }
];
```

All routes use lazy-loaded standalone components. The server routes file keeps `RenderMode.Prerender` for all paths (`**`), which is already configured in the scaffold.

### SSR Strategy

Angular 21 SSR with `RenderMode.Prerender` pre-renders all four routes at build time. The `provideClientHydration(withEventReplay())` already configured in `app.config.ts` handles hydration. No `isPlatformBrowser` guards are needed for data access since all data is static constants — only DOM-specific APIs (scroll lock, focus management) need platform guards.

---

## Components and Interfaces

### App Shell (`app.ts`)

The root component renders `<app-header>`, `<router-outlet>`, and `<app-footer>`. It imports `RouterOutlet`, `HeaderComponent`, and `FooterComponent`.

### HeaderComponent (`shared/header/`)

- Standalone component
- Displays logo/brand name as `routerLink="/"` 
- Navigation links: Home (`/`), Gallery (`/gallery`), About (`/about`), Contact (`/contact`)
- Uses `RouterLinkActive` with `[routerLinkActiveOptions]="{exact: true}"` for Home to highlight active route
- Mobile hamburger: a boolean signal `menuOpen` toggles a CSS class; the overlay is rendered in the DOM always but hidden via CSS (avoids SSR/hydration mismatch)
- `aria-label="Open navigation menu"` on hamburger button
- Closes menu on `NavigationEnd` router events

### FooterComponent (`shared/footer/`)

- Standalone component
- Displays brand name, nav links, social icons (Instagram, WhatsApp from `src/assets/images/`)
- Social links open in `target="_blank"` with `rel="noopener noreferrer"`
- `aria-label` on each social icon link
- Copyright year computed via `new Date().getFullYear()`

### LightboxComponent (`shared/lightbox/`)

- Standalone component, rendered inside `GalleryComponent`
- Receives `@Input() photos: Photo[]`, `@Input() activeIndex: number`, `@Output() close`
- Keyboard handling: `@HostListener('document:keydown.escape')` closes; arrow keys navigate
- Focus trap: on open, focuses the close button; on close, returns focus to the triggering element
- Scroll lock: `document.body.style.overflow = 'hidden'` on open, restored on close (platform browser guard)
- Backdrop click closes the lightbox (click on overlay div, not on image)
- Displays `photo.title` and `photo.category` as caption
- Uses `NgOptimizedImage` for the displayed photo

### Home Page Sections (all standalone, composed inside `HomeComponent`)

| Section | Key Responsibilities |
|---|---|
| `HeroComponent` | Full-viewport background image, name + tagline overlay, two CTA buttons |
| `FeaturedWorkComponent` | Grid of 6 curated photos, click navigates to `/gallery?category=X` |
| `PhilosophyComponent` | Heading + body text + supporting image via `NgOptimizedImage` |
| `OurWorkComponent` | Category cards (Landscape, Nature, Portrait, Events), each links to `/gallery?category=X` |
| `ServicesComponent` | Service cards with icon + title + description |
| `TestimonialsComponent` | Client testimonial cards with quote, name, star rating, optional avatar |
| `CtaComponent` | Headline + supporting text + Contact button |

### GalleryComponent (`pages/gallery/`)

- Reads `?category` query param on init to pre-select a filter
- Maintains `activeCategory` signal (default `'All'`)
- Filtered photos computed via `computed(() => ...)` signal
- Renders photo grid; click opens lightbox by setting `lightboxIndex` signal
- Passes filtered photos and active index to `LightboxComponent`
- On lightbox close, returns focus to the last-clicked photo element

### AboutComponent (`pages/about/`)

- Displays profile image with `NgOptimizedImage` and `priority` attribute
- Biography text, specialties list, stats (years, projects, clients)

### ContactComponent (`pages/contact/`)

- Reactive form using `FormBuilder` with validators: `Validators.required`, `Validators.email`
- On valid submit: sets `submitted = true` signal, shows success message — no HTTP call
- On invalid submit: marks all fields as touched to show validation errors
- Social links displayed below the form

---

## Data Models

### TypeScript Interfaces

```typescript
// core/data/portfolio.data.ts

export type PhotoCategory = 'Landscape' | 'Nature' | 'Portrait' | 'Events';

export interface Photo {
  id: number;
  title: string;
  category: PhotoCategory;
  description: string;
  filename: string;       // e.g. 'mountain-dreams.jpg'
  featured?: boolean;     // true = appears in Featured Work section
}

export interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  rating: number;         // 1–5
  avatarFilename?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  iconFilename: string;
}

export interface WorkCategory {
  category: PhotoCategory;
  coverFilename: string;
  label: string;
}

export interface AboutContent {
  biography: string;
  specialties: string[];
  yearsExperience: number;
  completedProjects: number;
  satisfiedClients: number;
  profileImageFilename: string;
}

export interface PhilosophyContent {
  heading: string;
  body: string;
  supportingImageFilename: string;
}
```

### Hardcoded Data Constants

All data lives in `core/data/portfolio.data.ts`. The `PortfolioService` (`core/services/portfolio.service.ts`) is a simple `@Injectable({ providedIn: 'root' })` service that imports and re-exports these constants as readonly properties — no HTTP, no async.

**Photo catalog** (mapped to existing assets):

| filename | category | featured |
|---|---|---|
| `mountain-dreams.jpg` | Landscape | ✓ |
| `desert-vastness.jpg` | Landscape | ✓ |
| `summit-glory.jpg` | Landscape | |
| `ocean-serenity.jpg` | Landscape | |
| `forest-whispers.jpg` | Nature | ✓ |
| `spring-bloom.jpg` | Nature | ✓ |
| `wild-encounters.jpg` | Nature | |
| `golden-hour.jpg` | Nature | |
| `photo-image-1.JPG` | Portrait | ✓ |
| `photo-image-2.jpg` | Portrait | ✓ |
| `photo-marriage.jpg` | Events | |
| `waterfall-majesty.jpg` | Nature | |

**Category cover images** (for Our Work section):

| Category | Cover |
|---|---|
| Landscape | `mountain-dreams.jpg` |
| Nature | `forest-whispers.jpg` |
| Portrait | `photo-image-1.JPG` |
| Events | `photo-marriage.jpg` |

**Philosophy section** uses `about-mountain.jpg` as the supporting image.

**About page** uses `photo-image-1.JPG` as the profile image.

---

## SCSS Responsive Strategy

A mobile-first approach using three breakpoints defined as SCSS variables/mixins:

```scss
// styles.scss or _breakpoints.scss
$bp-tablet: 768px;
$bp-desktop: 1280px;

@mixin tablet { @media (min-width: #{$bp-tablet}) { @content; } }
@mixin desktop { @media (min-width: #{$bp-desktop}) { @content; } }
```

### Gallery Grid

```scss
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;                          // mobile: 1 col
  gap: 1rem;

  @include tablet { grid-template-columns: repeat(2, 1fr); }   // 768px+: 2 col
  @include desktop { grid-template-columns: repeat(4, 1fr); }  // 1280px+: 4 col
}
```

Intermediate tablet range (768–1279px) uses 2–3 columns; the design uses 2 at tablet and 4 at desktop, satisfying requirements 14.2–14.4.

### Services / Testimonials / Our Work Cards

All card grids default to `grid-template-columns: 1fr` (single column on mobile) and expand to multi-column at `$bp-tablet`.

### Hero Typography

Uses `clamp()` for fluid font sizing:
```scss
.hero-title { font-size: clamp(2rem, 6vw, 5rem); }
.hero-tagline { font-size: clamp(1rem, 2.5vw, 1.75rem); }
```

### Philosophy Section

Two-column layout (image + text) at tablet+, stacked single column on mobile.

---

## SSR Considerations

1. **No `document`/`window` access at module level** — all DOM APIs (scroll lock, focus, `window.history`) are wrapped in `isPlatformBrowser` checks or deferred to `afterNextRender`.
2. **`NgOptimizedImage`** — requires `provideImageKitLoader` or the default loader. Since all images are local assets, the built-in `provideImgixLoader` is not needed; the default loader with explicit `width` and `height` attributes is sufficient. `NgOptimizedImage` is imported from `@angular/common`.
3. **Hero background image** — implemented as a CSS `background-image` on the hero element (not `NgOptimizedImage`) since it's a decorative full-bleed background. The image URL is set via inline style binding. The `priority` requirement (Req 12.2) is satisfied by adding a `<link rel="preload">` tag via Angular's `Meta`/`Link` service or by using `NgOptimizedImage` with `fill` mode and `priority`.
4. **Meta tags** — `Meta` and `Title` services from `@angular/platform-browser` are injected in each page component to set page-specific `<title>`, `<meta name="description">`, and Open Graph tags.
5. **Query params on SSR** — `GalleryComponent` reads `ActivatedRoute.snapshot.queryParams` (available on server) to pre-select the category filter during SSR.
6. **Contact form** — uses `ReactiveFormsModule`; no `HttpClient` import anywhere in the app.
7. **`RenderMode.Prerender`** — already configured in `app.routes.server.ts` for `**`, covering all four routes.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Gallery filter correctness

*For any* photo category (including 'All'), filtering the photo list by that category should return exactly the photos whose `category` field matches — and when 'All' is selected, all photos are returned unchanged.

**Validates: Requirements 6.1, 6.3, 6.4**

### Property 2: Featured work minimum count

*For any* photo data set, the subset of photos marked `featured: true` must contain at least 6 items.

**Validates: Requirements 3.1**

### Property 3: Featured photo card renders title and category

*For any* photo in the featured set, the rendered card HTML should contain both the photo's `title` and `category` strings.

**Validates: Requirements 3.2**

### Property 4: Category filter click navigates with correct query param

*For any* photo in the featured work section or any Work_Category_Card, clicking it should produce a navigation to `/gallery` with a `category` query param equal to that photo's or card's category value.

**Validates: Requirements 3.3, 16.4**

### Property 5: Services data completeness

*For any* service in the services data array, the item must have a non-empty `title`, non-empty `description`, and a non-empty `iconFilename`. The array must contain at least 3 items.

**Validates: Requirements 4.1**

### Property 6: Testimonials data completeness and rendering

*For any* testimonial in the testimonials data array, the rendered card must display the `quote`, `clientName`, and a star rating equal to the testimonial's `rating` value (1–5). The array must contain at least 3 items.

**Validates: Requirements 9.1, 9.2, 9.4**

### Property 7: Contact form validation — required fields

*For any* submission of the contact form with one or more required fields (name, email, subject, message) left empty, the form should be invalid and each empty required control should have a `required` error.

**Validates: Requirements 11.4**

### Property 8: Contact form validation — email format

*For any* string that does not conform to a valid email format, setting it as the value of the email control should result in that control having a `email` validation error.

**Validates: Requirements 11.5**

### Property 9: Contact form success — no HTTP call

*For any* valid form submission (all fields populated, valid email), the component should set `submitted` to `true` and display a success message, without invoking any HTTP method.

**Validates: Requirements 11.3, 11.7**

### Property 10: Active navigation link class

*For any* route the user navigates to, the corresponding navigation link in the header should have the active CSS class applied, and no other navigation link should have that class.

**Validates: Requirements 1.5**

### Property 11: Hamburger menu open/close state

*For any* initial state of the header, activating the hamburger button should set `menuOpen` to `true` (showing the overlay), and clicking any navigation link while the menu is open should set `menuOpen` to `false`.

**Validates: Requirements 1.7, 1.8**

### Property 12: Lightbox opens on photo click

*For any* photo in the gallery's current filtered set, clicking that photo should set the lightbox's active index to that photo's position in the filtered array.

**Validates: Requirements 7.1**

### Property 13: Lightbox closes on Escape key or backdrop click

*For any* open lightbox state, pressing the Escape key or clicking the backdrop overlay should emit the close event.

**Validates: Requirements 7.3, 7.4**

### Property 14: Lightbox caption displays photo metadata

*For any* photo displayed in the lightbox, the rendered caption should contain both the photo's `title` and `category` strings.

**Validates: Requirements 7.6**

### Property 15: About page specialties rendered

*For any* about content data, all items in the `specialties` array should appear in the rendered about page.

**Validates: Requirements 8.4**

### Property 16: Photo alt text non-empty

*For any* photo in the photo data array, the `title` or `description` field used as `alt` text must be a non-empty string.

**Validates: Requirements 13.1**

### Property 17: Contact form fields have associated labels

*For any* input field in the contact form (name, email, subject, message), there must be a `<label>` element whose `for` attribute matches the input's `id` attribute.

**Validates: Requirements 13.5**

### Property 18: Footer social links have aria-label and open in new tab

*For any* social media link in the footer, the anchor element must have a non-empty `aria-label` attribute and `target="_blank"`.

**Validates: Requirements 10.6, 13.6**

### Property 19: Footer copyright contains current year

*For any* rendering of the footer, the copyright text must contain the current calendar year as a four-digit string.

**Validates: Requirements 10.5**

### Property 20: Testimonial avatar alt text identifies client

*For any* testimonial that includes an `avatarFilename`, the rendered `<img>` element's `alt` attribute must be a non-empty string that includes the client's name.

**Validates: Requirements 13.7**

### Property 21: Our Work section category cards completeness

*For any* work category in the categories data array, the rendered Our Work section must include a card displaying the category name and a cover image, with a `routerLink` pointing to `/gallery` with the correct `category` query param.

**Validates: Requirements 16.2, 16.3, 16.4**

### Property 22: Data integrity — all data items have required fields

*For any* item in the photos, testimonials, services, about content, or philosophy content data constants, all required fields (as defined by the TypeScript interfaces) must be non-null and non-empty strings or valid numbers.

**Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5**

### Property 23: No external image URLs in data

*For any* `filename` field across photos, services, work categories, about content, and philosophy content data, the value must not start with `http://` or `https://` — all images are local asset paths.

**Validates: Requirements 17.6**

### Property 24: Page meta tags set per route

*For any* page component (Home, Gallery, About, Contact), the component must set a non-empty page `<title>` and `<meta name="description">` via Angular's `Title` and `Meta` services.

**Validates: Requirements 12.4**

---

## Error Handling

Since this is a fully static frontend-only application with no HTTP calls, traditional error handling (network errors, API failures) does not apply. Error handling focuses on:

1. **Form validation errors** — Reactive form validators surface errors inline; all fields show error messages when touched and invalid. The form never reaches a broken state.
2. **Missing image assets** — All filenames are hardcoded constants mapped to known assets in `src/assets/images/`. No dynamic image loading means no runtime 404 risk. During development, a broken image fallback style (e.g., `object-fit: contain` with a background color) provides graceful degradation.
3. **Unknown routes** — The `**` wildcard route redirects to `/`, preventing blank pages.
4. **Lightbox boundary conditions** — When the lightbox is at the first photo, the "previous" button is disabled; at the last photo, "next" is disabled. Navigation wraps or clamps depending on UX preference (design choice: clamp, no wrap).
5. **SSR/browser API guards** — Any code accessing `document`, `window`, or `localStorage` is wrapped in `isPlatformBrowser(this.platformId)` or deferred via `afterNextRender()` to prevent SSR crashes.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. They are complementary:
- Unit tests verify specific examples, integration points, and edge cases
- Property-based tests verify universal properties across many generated inputs

### Unit Tests (Jasmine + Angular TestBed)

Focus areas:
- **Component rendering examples**: Header renders logo and four nav links; Footer renders brand name and social icons; CTA renders headline and contact button; Hero renders two CTA buttons
- **Route configuration**: All four routes (`/`, `/gallery`, `/about`, `/contact`) are defined and load the correct components
- **Data service**: `PortfolioService` returns the expected arrays with correct types
- **Contact form integration**: Form initializes with four controls; valid submission shows success message; invalid submission shows errors
- **Lightbox integration**: Opens on photo click; closes on escape/backdrop; caption shows correct photo data
- **Gallery filter integration**: Selecting a category filters the displayed photos; 'All' shows all photos

### Property-Based Tests (fast-check)

Use [fast-check](https://github.com/dubzzz/fast-check) for TypeScript/Angular property-based testing.

Each property test runs a minimum of **100 iterations**.

Tag format for each test: `// Feature: photographer-portfolio, Property N: <property_text>`

| Property | Test Description | fast-check Arbitraries |
|---|---|---|
| P1: Gallery filter | `fc.constantFrom(...categories)` → filter → all results match | `fc.constantFrom` |
| P2: Featured count | Assert `photos.filter(p => p.featured).length >= 6` | Static data check |
| P3: Featured card renders | `fc.constantFrom(...featuredPhotos)` → render → contains title+category | `fc.constantFrom` |
| P4: Category nav | `fc.constantFrom(...photos)` → click → routerLink has correct category | `fc.constantFrom` |
| P5: Services data | Assert each service has non-empty title, description, iconFilename | Static data check |
| P6: Testimonials | `fc.constantFrom(...testimonials)` → render → contains quote, name, N stars | `fc.constantFrom` |
| P7: Form required | `fc.record({name: fc.constant(''), ...})` → submit → invalid | `fc.record`, `fc.constant` |
| P8: Email validation | `fc.string()` filtered to non-email → control invalid | `fc.string` |
| P9: Form success | Valid form data → submitted=true, no HTTP | `fc.record` with valid generators |
| P10: Active nav class | `fc.constantFrom('/', '/gallery', '/about', '/contact')` → navigate → correct link active | `fc.constantFrom` |
| P11: Hamburger state | Toggle open → menuOpen=true; click nav → menuOpen=false | Component state test |
| P12: Lightbox index | `fc.integer({min:0, max:photos.length-1})` → click → lightboxIndex matches | `fc.integer` |
| P13: Lightbox close | Escape key / backdrop click → close event emitted | Event simulation |
| P14: Lightbox caption | `fc.constantFrom(...photos)` → lightbox → caption contains title+category | `fc.constantFrom` |
| P15: About specialties | Assert all specialties appear in rendered output | Static data check |
| P16: Photo alt text | `fc.constantFrom(...photos)` → alt text non-empty | `fc.constantFrom` |
| P17: Form labels | Assert each input id matches a label's for attribute | DOM structure check |
| P18: Social links | Assert aria-label non-empty and target=_blank on each social link | DOM structure check |
| P19: Copyright year | Assert footer text contains `new Date().getFullYear().toString()` | Static check |
| P20: Avatar alt text | `fc.constantFrom(...testimonialsWithAvatar)` → alt contains clientName | `fc.constantFrom` |
| P21: Our Work cards | Assert each category has a card with correct routerLink | Static data check |
| P22: Data integrity | Assert all required fields non-null/non-empty across all data arrays | Static data check |
| P23: No external URLs | `fc.constantFrom(...allFilenames)` → does not start with http | `fc.constantFrom` |
| P24: Page meta tags | Each page component sets non-empty title and description | Component test |

### Testing Notes

- Properties P2, P5, P15, P21, P22, P23 operate on static data constants and are effectively deterministic checks — fast-check is still used for consistency and to enable future data expansion
- Properties involving DOM rendering use Angular's `TestBed` with `ComponentFixture`
- No `HttpClientTestingModule` is needed anywhere (no HTTP calls in the app)
- SSR-specific behavior (pre-rendered HTML, meta tags in server context) is validated via Angular's `@angular/ssr` testing utilities or build-time checks
