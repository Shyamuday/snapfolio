/**
 * Central image path registry.
 * To change the base path (e.g. CDN URL), update IMAGES_BASE only.
 * All image references across the app derive from this file.
 */

export const IMAGES_BASE = 'assets/images';

export const IMAGES = {
    // Photos
    mountainDreams: `${IMAGES_BASE}/mountain-dreams.jpg`,
    desertVastness: `${IMAGES_BASE}/desert-vastness.jpg`,
    summitGlory: `${IMAGES_BASE}/summit-glory.jpg`,
    oceanSerenity: `${IMAGES_BASE}/ocean-serenity.jpg`,
    forestWhispers: `${IMAGES_BASE}/forest-whispers.jpg`,
    springBloom: `${IMAGES_BASE}/spring-bloom.jpg`,
    wildEncounters: `${IMAGES_BASE}/wild-encounters.jpg`,
    goldenHour: `${IMAGES_BASE}/golden-hour.jpg`,
    photoImage1: `${IMAGES_BASE}/photo-image-1.JPG`,
    photoImage2: `${IMAGES_BASE}/photo-image-2.jpg`,
    photoMarriage: `${IMAGES_BASE}/photo-marriage.jpg`,
    waterfallMajesty: `${IMAGES_BASE}/waterfall-majesty.jpg`,

    // UI / About
    aboutMountain: `${IMAGES_BASE}/about-mountain.jpg`,

    // Icons
    instagramIcon: `${IMAGES_BASE}/Instagram_icon.png`,
    whatsappIcon: `${IMAGES_BASE}/WhatsApp.svg.png`,
    instagramWhite: `${IMAGES_BASE}/instagram-white-icon.svg`,
    whatsappWhite: `${IMAGES_BASE}/whatsapp-white-icon.svg`,
    arrowLeft: `${IMAGES_BASE}/angle-left-solid-full.svg`,
    arrowRight: `${IMAGES_BASE}/angle-right-solid-full.svg`,
} as const;

export type ImageKey = keyof typeof IMAGES;

// ---------------------------------------------------------------------------
// Responsive image support
// ---------------------------------------------------------------------------

/**
 * Defines per-breakpoint image sources for a single logical image.
 * - mobile:  shown on screens < 768px
 * - tablet:  shown on screens 768px – 1279px
 * - desktop: shown on screens >= 1280px (also the <img> fallback)
 *
 * To add a new variant, add the key here and supply paths below.
 * The <app-responsive-image> component renders a <picture> element
 * with <source media="..."> entries in this order.
 */
export interface ResponsiveImage {
    mobile: string;
    tablet: string;
    desktop: string;
    alt: string;
}

/**
 * Responsive image registry.
 * Right now mobile/tablet/desktop all point to the same file because we only
 * have one resolution per photo. When you add optimised variants (e.g.
 * mountain-dreams-mobile.jpg), just update the path here — nothing else
 * in the app needs to change.
 */
export const RESPONSIVE_IMAGES = {
    hero: {
        mobile: IMAGES.goldenHour,
        tablet: IMAGES.goldenHour,
        desktop: IMAGES.goldenHour,
        alt: 'Golden hour landscape — hero background',
    },
    mountainDreams: {
        mobile: IMAGES.mountainDreams,
        tablet: IMAGES.mountainDreams,
        desktop: IMAGES.mountainDreams,
        alt: 'Mountain Dreams',
    },
    desertVastness: {
        mobile: IMAGES.desertVastness,
        tablet: IMAGES.desertVastness,
        desktop: IMAGES.desertVastness,
        alt: 'Desert Vastness',
    },
    forestWhispers: {
        mobile: IMAGES.forestWhispers,
        tablet: IMAGES.forestWhispers,
        desktop: IMAGES.forestWhispers,
        alt: 'Forest Whispers',
    },
    aboutProfile: {
        mobile: IMAGES.photoImage1,
        tablet: IMAGES.photoImage1,
        desktop: IMAGES.photoImage1,
        alt: 'Aditya — professional photographer',
    },
    aboutMountain: {
        mobile: IMAGES.aboutMountain,
        tablet: IMAGES.aboutMountain,
        desktop: IMAGES.aboutMountain,
        alt: "Mountain landscape representing the photographer's philosophy",
    },
} satisfies Record<string, ResponsiveImage>;
