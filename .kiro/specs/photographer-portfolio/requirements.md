# Requirements Document

## Introduction

Snapfolio is a photographer portfolio website built with Angular 21 and SSR. It showcases a photographer's work through a visually rich, performant, and accessible web experience. The site includes a home/hero section, a filterable photo gallery, an about page, and a contact section. It leverages the existing sample images in `src/assets/images/` and takes full advantage of Angular's SSR capabilities for SEO and fast initial load.

**This is a fully frontend-only application.** There is no backend, no API, no database, and no HTTP requests of any kind. All data — including photos, testimonials, services, categories, philosophy text, about page content, and statistics — SHALL be hardcoded as TypeScript constants or arrays within the Angular app (e.g., in a dedicated data service or constants file). The contact form SHALL simulate submission client-side only. There is no authentication, no CMS, and no external API integration.

## Glossary

- **Portfolio_App**: The Angular 21 SSR application (snapfolio) serving the photographer portfolio website.
- **Gallery**: The page or section displaying the photographer's photo collection in a grid layout.
- **Photo**: A single image asset with associated metadata (title, category, description).
- **Category**: A label used to group photos (e.g., Landscape, Nature, Portrait, Events).
- **Hero_Section**: The full-width introductory section displayed at the top of the home page.
- **Featured_Work_Section**: A curated selection of Photos displayed on the home page to highlight the photographer's best work.
- **Services_Section**: A section on the home page listing the photography services offered.
- **CTA_Section**: A call-to-action section on the home page prompting visitors to get in touch.
- **Testimonials_Section**: A section displaying client reviews and quotes with attribution.
- **Testimonial**: A single client review consisting of a quote, client name, and optional client photo.
- **Header**: The site-wide top navigation component containing the logo and navigation links.
- **Footer**: The site-wide bottom component containing secondary links, social media icons, and copyright notice.
- **Lightbox**: An overlay component that displays a Photo at full/large size when selected.
- **Contact_Form**: The form through which visitors submit inquiries to the photographer.
- **Navigation**: The site-wide header component providing links to all major sections/pages.
- **SSR**: Server-Side Rendering, Angular's mechanism for pre-rendering pages on the server.
- **Visitor**: Any user browsing the portfolio website.
- **Philosophy_Section**: A home page section communicating the photographer's creative philosophy, values, and approach to photography.
- **Our_Work_Section**: A home page section showcasing the photographer's work categories or portfolio highlights, distinct from the Featured_Work_Section.
- **Work_Category_Card**: A card component within the Our_Work_Section representing a single photography category, linking to the filtered Gallery.

---

## Requirements

### Requirement 1: Site Header and Navigation

**User Story:** As a visitor, I want a consistent site-wide header with a logo and navigation menu, so that I can identify the brand and easily move between sections of the portfolio.

#### Acceptance Criteria

1. THE Header SHALL be displayed at the top of every page across the Portfolio_App.
2. THE Header SHALL display the photographer's logo or brand name as a link that navigates to the Home page.
3. THE Header SHALL display Navigation links to Home, Gallery, About, and Contact pages.
4. WHEN a Visitor clicks a Navigation link, THE Portfolio_App SHALL navigate to the corresponding route without a full page reload.
5. WHILE a Visitor is on a given route, THE Header SHALL visually indicate the active Navigation link.
6. WHEN the viewport width is less than 768px, THE Header SHALL collapse the Navigation links into a hamburger menu button.
7. WHEN the hamburger menu button is activated, THE Header SHALL display the Navigation links in a full-width dropdown overlay.
8. WHEN the hamburger menu is open and a Visitor clicks a Navigation link, THE Header SHALL close the dropdown overlay and navigate to the selected route.
9. WHEN the Portfolio_App renders via SSR, THE Header SHALL be included in the pre-rendered HTML.

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want an impactful hero section on the home page, so that I immediately understand the photographer's style and identity.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a full-viewport-height background image with the photographer's name and a tagline overlaid.
2. THE Hero_Section SHALL include a primary call-to-action button that navigates the Visitor to the Gallery.
3. THE Hero_Section SHALL include a secondary call-to-action button that navigates the Visitor to the Contact page.
4. WHEN the Portfolio_App renders on the server via SSR, THE Hero_Section SHALL be included in the pre-rendered HTML so that it is visible before JavaScript loads.

---

### Requirement 3: Home Page — Featured Work Section

**User Story:** As a visitor, I want to see a curated selection of the photographer's best work on the home page, so that I can quickly assess their style without browsing the full gallery.

#### Acceptance Criteria

1. THE Featured_Work_Section SHALL display a curated grid of at least 6 Photos selected to represent the photographer's best work.
2. THE Featured_Work_Section SHALL display each Photo with its title and category label.
3. WHEN a Visitor clicks a Photo in the Featured_Work_Section, THE Portfolio_App SHALL navigate the Visitor to the Gallery page with that Photo's Category pre-selected as the active filter.
4. THE Featured_Work_Section SHALL include a "View Full Gallery" link that navigates the Visitor to the Gallery page.
5. WHEN the Portfolio_App renders the Featured_Work_Section via SSR, THE Featured_Work_Section SHALL be included in the pre-rendered HTML.

---

### Requirement 4: Home Page — Services Section

**User Story:** As a visitor, I want to see the photography services offered on the home page, so that I can quickly determine whether the photographer covers the type of work I need.

#### Acceptance Criteria

1. THE Services_Section SHALL display a list of at least 3 service offerings, each with a title, a brief description, and an icon or representative image.
2. THE Services_Section SHALL be displayed on the home page below the Featured_Work_Section.
3. WHEN the Portfolio_App renders the Services_Section via SSR, THE Services_Section SHALL be included in the pre-rendered HTML.

---

### Requirement 5: Home Page — Call-to-Action Section

**User Story:** As a visitor who has browsed the home page, I want a prominent call-to-action section, so that I am encouraged to reach out to the photographer.

#### Acceptance Criteria

1. THE CTA_Section SHALL display a headline, a supporting sentence, and a button that navigates the Visitor to the Contact page.
2. THE CTA_Section SHALL be displayed on the home page below the Testimonials_Section.
3. WHEN the Portfolio_App renders the CTA_Section via SSR, THE CTA_Section SHALL be included in the pre-rendered HTML.

---

### Requirement 6: Photo Gallery with Category Filtering

**User Story:** As a visitor, I want to browse and filter photos by category, so that I can quickly find the type of photography I'm interested in.

#### Acceptance Criteria

1. THE Gallery SHALL display all Photos in a responsive masonry or grid layout.
2. THE Gallery SHALL display category filter buttons for each available Category.
3. WHEN a Visitor selects a Category filter, THE Gallery SHALL display only Photos belonging to that Category.
4. WHEN a Visitor selects the "All" filter, THE Gallery SHALL display all Photos regardless of Category.
5. WHEN a Category filter is active, THE Gallery SHALL visually distinguish the active filter button from inactive ones.
6. THE Gallery SHALL display at minimum the following categories derived from the available assets: Landscape, Nature, Portrait, and Events.

---

### Requirement 7: Photo Lightbox

**User Story:** As a visitor, I want to view individual photos in a larger overlay, so that I can appreciate the full detail of each image.

#### Acceptance Criteria

1. WHEN a Visitor clicks a Photo in the Gallery, THE Lightbox SHALL open and display the selected Photo at the largest size that fits within the viewport.
2. WHEN the Lightbox is open, THE Lightbox SHALL display navigation controls to move to the previous and next Photo in the current filtered set.
3. WHEN a Visitor presses the Escape key while the Lightbox is open, THE Lightbox SHALL close.
4. WHEN a Visitor clicks outside the Photo area while the Lightbox is open, THE Lightbox SHALL close.
5. WHEN the Lightbox is open, THE Portfolio_App SHALL prevent the background page from scrolling.
6. THE Lightbox SHALL display the Photo's title and category as a caption.

---

### Requirement 8: About Page

**User Story:** As a visitor, I want to learn about the photographer, so that I can understand their background, style, experience, and areas of expertise.

#### Acceptance Criteria

1. THE Portfolio_App SHALL provide an About page accessible at the `/about` route.
2. THE About page SHALL display a profile image of the photographer using Angular's `NgOptimizedImage` directive.
3. THE About page SHALL display a biographical text section describing the photographer's background and photographic philosophy.
4. THE About page SHALL display a list of the photographer's specialties or skills (e.g., Portrait, Landscape, Events, Commercial).
5. THE About page SHALL display the number of years of experience, number of completed projects, and number of satisfied clients as highlight statistics.
6. WHEN the Portfolio_App renders the About page via SSR, THE About page SHALL be included in the pre-rendered HTML.

---

### Requirement 9: Testimonials Section

**User Story:** As a visitor, I want to read reviews from past clients, so that I can build trust in the photographer's professionalism and quality of work.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL display a minimum of 3 Testimonials on the home page.
2. THE Testimonials_Section SHALL display each Testimonial with the client's quote, client name, and an optional client photo or avatar placeholder.
3. WHEN a client photo is provided for a Testimonial, THE Testimonials_Section SHALL display it as a circular avatar image.
4. THE Testimonials_Section SHALL display a star rating (1–5 stars) for each Testimonial.
5. WHEN the Portfolio_App renders the Testimonials_Section via SSR, THE Testimonials_Section SHALL be included in the pre-rendered HTML.

---

### Requirement 10: Site Footer

**User Story:** As a visitor, I want a consistent site-wide footer, so that I can find secondary navigation links, social media profiles, and copyright information from any page.

#### Acceptance Criteria

1. THE Footer SHALL be displayed at the bottom of every page across the Portfolio_App.
2. THE Footer SHALL display the photographer's logo or brand name.
3. THE Footer SHALL display secondary Navigation links to Home, Gallery, About, and Contact pages.
4. THE Footer SHALL display social media icon links for Instagram and WhatsApp using the available icon assets.
5. THE Footer SHALL display a copyright notice including the current year and the photographer's name.
6. WHEN a Visitor clicks a social media icon link in the Footer, THE Portfolio_App SHALL open the corresponding social media profile in a new browser tab.
7. WHEN the Portfolio_App renders via SSR, THE Footer SHALL be included in the pre-rendered HTML.

---

### Requirement 11: Contact Section

**User Story:** As a visitor, I want to send an inquiry to the photographer, so that I can discuss potential bookings or collaborations.

#### Acceptance Criteria

1. THE Portfolio_App SHALL provide a Contact section accessible at the `/contact` route.
2. THE Contact_Form SHALL include fields for the visitor's name, email address, subject, and message.
3. WHEN a Visitor submits the Contact_Form with all required fields populated and a valid email format, THE Contact_Form SHALL display a success confirmation message without making any HTTP request or network call.
4. WHEN a Visitor submits the Contact_Form with one or more required fields empty, THE Contact_Form SHALL display a validation error message identifying the missing fields.
5. WHEN a Visitor submits the Contact_Form with an invalid email format, THE Contact_Form SHALL display a validation error message on the email field.
6. THE Contact section SHALL display the photographer's social media links (Instagram, WhatsApp) using the available icon assets.
7. THE Contact_Form SHALL NOT send form data to any server, API endpoint, or external service; submission handling SHALL be entirely client-side.

---

### Requirement 12: Image Performance and SSR Optimization

**User Story:** As a visitor, I want the portfolio to load quickly, so that I can start viewing photos without delay.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use Angular's `NgOptimizedImage` directive for all Photo and profile images to enable lazy loading and automatic size optimization.
2. THE Hero_Section background image SHALL be marked with `priority` loading to ensure it is fetched eagerly.
3. WHEN the Portfolio_App is built for production, THE Portfolio_App SHALL pre-render all static routes (Home, Gallery, About, Contact) via SSR to produce static HTML.
4. THE Portfolio_App SHALL include appropriate `<meta>` tags (title, description, Open Graph) on each page to support SEO.

---

### Requirement 13: Accessibility

**User Story:** As a visitor using assistive technology, I want the portfolio to be navigable and understandable, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Gallery SHALL provide descriptive `alt` text for every Photo image.
2. THE Lightbox SHALL trap keyboard focus within the overlay while it is open.
3. WHEN the Lightbox closes, THE Portfolio_App SHALL return keyboard focus to the Gallery Photo that triggered the Lightbox.
4. THE Header hamburger menu button SHALL have an `aria-label` describing its purpose.
5. THE Contact_Form fields SHALL each have an associated `<label>` element linked via `for`/`id` attributes.
6. THE Footer social media icon links SHALL each have an `aria-label` identifying the target platform.
7. THE Testimonials_Section client avatar images SHALL each have descriptive `alt` text identifying the client.

---

### Requirement 14: Full Responsiveness

**User Story:** As a visitor, I want the entire portfolio site to display correctly on any device, so that I can browse the photographer's work comfortably on mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render all components — including the Header, Footer, Hero_Section, Featured_Work_Section, Philosophy_Section, Our_Work_Section, Services_Section, Testimonials_Section, CTA_Section, Gallery, Lightbox, About page, and Contact section — without horizontal overflow or broken layouts at viewport widths of 320px, 768px, and 1280px.
2. WHEN the viewport width is less than 768px, THE Gallery SHALL display Photos in a single-column or two-column grid layout.
3. WHEN the viewport width is between 768px and 1279px, THE Gallery SHALL display Photos in a two-column or three-column grid layout.
4. WHEN the viewport width is 1280px or greater, THE Gallery SHALL display Photos in a layout of at least four columns.
5. WHEN the viewport width is less than 768px, THE Hero_Section SHALL scale its typography and call-to-action buttons to remain fully readable and tappable without horizontal scrolling.
6. WHEN the viewport width is less than 768px, THE Services_Section SHALL stack service cards vertically in a single column.
7. WHEN the viewport width is less than 768px, THE Testimonials_Section SHALL display one Testimonial at a time or stack Testimonials vertically.
8. WHEN the viewport width is less than 768px, THE Our_Work_Section SHALL stack Work_Category_Cards vertically in a single column.
9. WHEN the viewport width is less than 768px, THE Philosophy_Section SHALL stack its text content and supporting image vertically.
10. WHEN the Portfolio_App renders via SSR, THE Portfolio_App SHALL include responsive CSS in the pre-rendered HTML so that layout is correct before JavaScript loads.

---

### Requirement 15: Home Page — Our Philosophy Section

**User Story:** As a visitor, I want to read about the photographer's creative philosophy and values on the home page, so that I can understand their artistic approach and decide whether their style aligns with my needs.

#### Acceptance Criteria

1. THE Philosophy_Section SHALL be displayed on the home page between the Featured_Work_Section and the Services_Section.
2. THE Philosophy_Section SHALL display a section heading that identifies the content as the photographer's philosophy or creative approach.
3. THE Philosophy_Section SHALL display at least one paragraph of descriptive text communicating the photographer's values, creative process, and approach to photography.
4. WHERE a supporting image is configured, THE Philosophy_Section SHALL display the image alongside the descriptive text using Angular's `NgOptimizedImage` directive.
5. THE Philosophy_Section SHALL display the supporting image with descriptive `alt` text that conveys the image content to assistive technologies.
6. WHEN the Portfolio_App renders the Philosophy_Section via SSR, THE Philosophy_Section SHALL be included in the pre-rendered HTML.

---

### Requirement 16: Home Page — Our Work Section

**User Story:** As a visitor, I want to see the photographer's work organized by category on the home page, so that I can quickly navigate to the type of photography I am most interested in.

#### Acceptance Criteria

1. THE Our_Work_Section SHALL be displayed on the home page and SHALL be visually distinct from the Featured_Work_Section.
2. THE Our_Work_Section SHALL display a Work_Category_Card for each available Category, showing at minimum the category name and a representative cover image.
3. THE Our_Work_Section SHALL display a Work_Category_Card for each of the following categories derived from the available assets: Landscape, Nature, Portrait, and Events.
4. WHEN a Visitor clicks a Work_Category_Card, THE Portfolio_App SHALL navigate to the Gallery page with the corresponding Category pre-selected as the active filter.
5. THE Our_Work_Section SHALL include a link or button that navigates the Visitor to the Gallery page with no category filter applied.
6. WHEN the Portfolio_App renders the Our_Work_Section via SSR, THE Our_Work_Section SHALL be included in the pre-rendered HTML.

---

### Requirement 17: Hardcoded Frontend-Only Data

**User Story:** As a developer, I want all application data to be defined as TypeScript constants within the Angular app, so that the site runs entirely in the browser with no backend dependency.

#### Acceptance Criteria

1. THE Portfolio_App SHALL define all Photo metadata (title, category, description, filename) as TypeScript constants or arrays within a dedicated data service or constants file.
2. THE Portfolio_App SHALL define all Testimonial data (quote, client name, star rating, optional avatar filename) as TypeScript constants within the same data service or constants file.
3. THE Portfolio_App SHALL define all service offerings (title, description, icon reference) as TypeScript constants within the same data service or constants file.
4. THE Portfolio_App SHALL define all About page content (biography text, specialties, years of experience, completed projects, satisfied clients count) as TypeScript constants within the same data service or constants file.
5. THE Portfolio_App SHALL define all Philosophy_Section content (heading, body text, optional supporting image filename) as TypeScript constants within the same data service or constants file.
6. THE Portfolio_App SHALL serve all image assets from `src/assets/images/` with no external image URLs.
7. THE Portfolio_App SHALL NOT import or use Angular's `HttpClient` or make any HTTP requests at runtime.
8. THE Portfolio_App SHALL NOT depend on any CMS, authentication service, or external API.
