/**
 * Central image path registry.
 * To change the base path (e.g. CDN URL), update IMAGES_BASE only.
 * All image references across the app derive from this file.
 */

export const IMAGES_BASE = 'assets/images';

export const IMAGES = {
    mountainDreams: `${IMAGES_BASE}/mountain-dreams.jpg`,
    desertVastness: `${IMAGES_BASE}/desert-vastness.jpg`,
    oceanSerenity: `${IMAGES_BASE}/ocean-serenity.jpg`,
    forestWhispers: `${IMAGES_BASE}/forest-whispers.jpg`,
    goldenHour: `${IMAGES_BASE}/golden-hour.jpg`,
    photoImage1: `${IMAGES_BASE}/photo-image-1.JPG`,
} as const;
