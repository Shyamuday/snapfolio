// All hardcoded portfolio data constants for Aditya Deshmukh Photography
import { IMAGES } from '../config/image-paths';

export type PhotoCategory = 'Films' | 'Fashion' | 'Commercial/Corporate' | 'Wedding/Events';

export type PhotoSubcategory = string;

export const SUBCATEGORIES: Record<PhotoCategory, PhotoSubcategory[]> = {
    'Films': [],
    'Fashion': [],
    'Commercial/Corporate': [],
    'Wedding/Events': [],
};

export interface Photo {
    id: number;
    title: string;
    category: PhotoCategory;
    subcategory?: PhotoSubcategory;
    albumId?: number;
    description: string;
    filename: string;
    featured?: boolean;
}

export interface Album {
    id: number;
    name: string;
    category: PhotoCategory;
    subcategory: PhotoSubcategory;
    coverFilename: string;
    photos: Photo[];
}

export interface Testimonial {
    id: number;
    quote: string;
    clientName: string;
    rating: number;
    avatarFilename?: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    iconFilename: string;
    category: PhotoCategory;
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

export type EventAlbum = Album;

export const PHOTOS: Photo[] = [
    // ── Films ─────────────────────────────────────────────────────────────
    { id: 14, title: 'Short Film I', category: 'Films', albumId: 4, description: 'Candid moments from a vibrant film production.', filename: IMAGES.goldenHour, featured: true },
    { id: 15, title: 'Short Film II', category: 'Films', albumId: 4, description: 'Behind the scenes of a creative film shoot.', filename: IMAGES.photoImage1 },
    { id: 25, title: 'Documentary Clip', category: 'Films', albumId: 5, description: 'A powerful documentary moment captured on set.', filename: IMAGES.springBloom },
    { id: 26, title: 'Film Still', category: 'Films', albumId: 5, description: 'A cinematic still from an independent production.', filename: IMAGES.forestWhispers },

    // ── Fashion ───────────────────────────────────────────────────────────
    { id: 16, title: 'Editorial Shoot', category: 'Fashion', albumId: 6, description: 'High-fashion editorial with bold styling.', filename: IMAGES.photoImage2, featured: true },
    { id: 17, title: 'Studio Fashion', category: 'Fashion', albumId: 6, description: 'Clean studio fashion photography with dramatic lighting.', filename: IMAGES.photoImage1 },
    { id: 27, title: 'Outdoor Fashion', category: 'Fashion', albumId: 7, description: 'Fashion shoot in a natural outdoor setting.', filename: IMAGES.goldenHour },
    { id: 28, title: 'Runway Moments', category: 'Fashion', albumId: 7, description: 'Capturing the energy of a live runway show.', filename: IMAGES.summitGlory },

    // ── Commercial/Corporate ──────────────────────────────────────────────
    { id: 18, title: 'Corporate Summit', category: 'Commercial/Corporate', albumId: 8, description: 'Professional coverage of a high-profile corporate summit.', filename: IMAGES.mountainDreams, featured: true },
    { id: 19, title: 'Team Headshots', category: 'Commercial/Corporate', albumId: 8, description: 'Clean, professional headshots for a growing company team.', filename: IMAGES.photoImage2 },
    { id: 29, title: 'Product Launch', category: 'Commercial/Corporate', albumId: 9, description: 'Capturing the energy of a major product launch event.', filename: IMAGES.oceanSerenity },
    { id: 30, title: 'Conference Panel', category: 'Commercial/Corporate', albumId: 9, description: 'Industry leaders on stage at an annual conference.', filename: IMAGES.mountainDreams },

    // ── Wedding/Events ────────────────────────────────────────────────────
    { id: 11, title: 'Wedding Celebration', category: 'Wedding/Events', albumId: 1, description: 'A joyful moment frozen in time from a beautiful wedding ceremony.', filename: IMAGES.photoMarriage, featured: true },
    { id: 13, title: 'Wedding Vows', category: 'Wedding/Events', albumId: 1, description: 'An emotional exchange of vows captured in perfect light.', filename: IMAGES.photoMarriage },
    { id: 20, title: 'Reception Dance', category: 'Wedding/Events', albumId: 2, description: 'The first dance at a magical evening reception.', filename: IMAGES.photoMarriage },
    { id: 21, title: 'Bridal Portrait', category: 'Wedding/Events', albumId: 2, description: 'A stunning bridal portrait in natural light.', filename: IMAGES.photoImage1 },
    { id: 22, title: 'Garden Ceremony', category: 'Wedding/Events', albumId: 2, description: 'An intimate garden ceremony surrounded by blooms.', filename: IMAGES.springBloom },
    { id: 23, title: 'Sunset Vows', category: 'Wedding/Events', albumId: 3, description: 'Vows exchanged as the sun dipped below the horizon.', filename: IMAGES.goldenHour },
    { id: 24, title: 'Couple Portrait', category: 'Wedding/Events', albumId: 3, description: 'A tender couple portrait after the ceremony.', filename: IMAGES.photoImage2 },
];

export const ALBUMS: Album[] = [
    // Films
    { id: 4, name: 'Short Films', category: 'Films', subcategory: 'Films', coverFilename: IMAGES.goldenHour, photos: PHOTOS.filter(p => p.albumId === 4) },
    { id: 5, name: 'Documentary', category: 'Films', subcategory: 'Films', coverFilename: IMAGES.springBloom, photos: PHOTOS.filter(p => p.albumId === 5) },
    // Fashion
    { id: 6, name: 'Studio Editorials', category: 'Fashion', subcategory: 'Fashion', coverFilename: IMAGES.photoImage2, photos: PHOTOS.filter(p => p.albumId === 6) },
    { id: 7, name: 'Outdoor & Runway', category: 'Fashion', subcategory: 'Fashion', coverFilename: IMAGES.summitGlory, photos: PHOTOS.filter(p => p.albumId === 7) },
    // Commercial/Corporate
    { id: 8, name: 'Corporate Events', category: 'Commercial/Corporate', subcategory: 'Commercial/Corporate', coverFilename: IMAGES.mountainDreams, photos: PHOTOS.filter(p => p.albumId === 8) },
    { id: 9, name: 'Product & Launch', category: 'Commercial/Corporate', subcategory: 'Commercial/Corporate', coverFilename: IMAGES.oceanSerenity, photos: PHOTOS.filter(p => p.albumId === 9) },
    // Wedding/Events
    { id: 1, name: 'Sarah & James', category: 'Wedding/Events', subcategory: 'Wedding/Events', coverFilename: IMAGES.photoMarriage, photos: PHOTOS.filter(p => p.albumId === 1) },
    { id: 2, name: 'Priya & Rohan', category: 'Wedding/Events', subcategory: 'Wedding/Events', coverFilename: IMAGES.photoImage1, photos: PHOTOS.filter(p => p.albumId === 2) },
    { id: 3, name: 'Elena & Marco', category: 'Wedding/Events', subcategory: 'Wedding/Events', coverFilename: IMAGES.goldenHour, photos: PHOTOS.filter(p => p.albumId === 3) },
];

export const EVENT_ALBUMS = ALBUMS.filter(a => a.category === 'Wedding/Events');

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: "Working with this photographer was an absolute dream. Every shot from our wedding day tells a story — we couldn't be happier with the results.", clientName: 'Sarah & James Mitchell', rating: 5 },
    { id: 2, quote: 'The portrait session exceeded all my expectations. The photographer has a rare gift for making you feel at ease while capturing something truly special.', clientName: 'Elena Vasquez', rating: 5 },
    { id: 3, quote: 'I commissioned a series of landscape prints for my office and the quality is stunning. Each image has a depth and atmosphere that photographs rarely achieve.', clientName: 'David Okafor', rating: 4 },
    { id: 4, quote: 'Our corporate event was documented beautifully. Every key moment was captured with professionalism and a creative eye that set these photos apart.', clientName: 'Priya Sharma', rating: 5 },
];

export const SERVICES: Service[] = [
    { id: 1, title: 'Films', description: 'Cinematic storytelling through short films, documentaries, and creative productions.', iconFilename: IMAGES.goldenHour, category: 'Films' },
    { id: 2, title: 'Fashion', description: 'High-fashion editorials, studio shoots, and runway coverage with a bold creative eye.', iconFilename: IMAGES.photoImage2, category: 'Fashion' },
    { id: 3, title: 'Commercial / Corporate', description: 'Professional coverage of corporate events, product launches, headshots, and brand campaigns.', iconFilename: IMAGES.mountainDreams, category: 'Commercial/Corporate' },
    { id: 4, title: 'Wedding / Events', description: 'Timeless wedding photography and full event coverage — every meaningful moment preserved.', iconFilename: IMAGES.photoMarriage, category: 'Wedding/Events' },
];

export const WORK_CATEGORIES: WorkCategory[] = [
    { category: 'Films', coverFilename: IMAGES.goldenHour, label: 'Films' },
    { category: 'Fashion', coverFilename: IMAGES.photoImage2, label: 'Fashion' },
    { category: 'Commercial/Corporate', coverFilename: IMAGES.mountainDreams, label: 'Commercial/Corporate' },
    { category: 'Wedding/Events', coverFilename: IMAGES.photoMarriage, label: 'Wedding/Events' },
];

export const ABOUT_CONTENT: AboutContent = {
    biography: "Hi, I'm Aditya — a professional photographer who loves capturing real moments and genuine emotions. I work across weddings, fashion, and travel photography, helping people and brands tell their stories through clean, natural, and high-quality imagery. I believe great photos come from trust, comfort, and a shared creative vision.",
    specialties: ['Wedding Photography', 'Fashion & Editorial', 'Films', 'Commercial/Corporate'],
    yearsExperience: 12,
    completedProjects: 340,
    satisfiedClients: 280,
    profileImageFilename: IMAGES.photoImage1,
};

export const PHILOSOPHY_CONTENT: PhilosophyContent = {
    heading: 'Light, Patience, and Truth',
    body: 'Great photography is never rushed. It is the art of waiting for the perfect convergence of light, subject, and moment — then having the skill and instinct to capture it. I approach every shoot with patience, curiosity, and a deep respect for the story unfolding in front of the lens. My goal is not simply to document, but to reveal something true and lasting in every frame.',
    supportingImageFilename: IMAGES.aboutMountain,
};
