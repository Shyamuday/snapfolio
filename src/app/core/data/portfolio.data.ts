// All hardcoded portfolio data constants for Snapfolio
import { IMAGES } from '../config/image-paths';

export type PhotoCategory = 'Landscape' | 'Nature' | 'Portrait' | 'Events';
export type EventSubcategory = 'Marriage' | 'Birthday' | 'Party' | 'Corporate';

export interface Photo {
    id: number;
    title: string;
    category: PhotoCategory;
    subcategory?: EventSubcategory;
    albumId?: number;
    description: string;
    filename: string;
    featured?: boolean;
}

export interface EventAlbum {
    id: number;
    name: string;
    subcategory: EventSubcategory;
    coverFilename: string;
    photos: Photo[];
}

export interface Testimonial {
    id: number;
    quote: string;
    clientName: string;
    rating: number; // 1–5
    avatarFilename?: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    iconFilename: string; // full path via IMAGES
    category: PhotoCategory;
}

export interface WorkCategory {
    category: PhotoCategory;
    coverFilename: string; // full path via IMAGES
    label: string;
}

export interface AboutContent {
    biography: string;
    specialties: string[];
    yearsExperience: number;
    completedProjects: number;
    satisfiedClients: number;
    profileImageFilename: string; // full path via IMAGES
}

export interface PhilosophyContent {
    heading: string;
    body: string;
    supportingImageFilename: string; // full path via IMAGES
}

export const PHOTOS: Photo[] = [
    { id: 1, title: 'Mountain Dreams', category: 'Landscape', description: 'A breathtaking view of mountain peaks bathed in golden morning light.', filename: IMAGES.mountainDreams, featured: true },
    { id: 2, title: 'Desert Vastness', category: 'Landscape', description: 'The endless expanse of a sun-scorched desert stretching to the horizon.', filename: IMAGES.desertVastness, featured: true },
    { id: 3, title: 'Summit Glory', category: 'Landscape', description: 'A dramatic summit silhouetted against a vivid twilight sky.', filename: IMAGES.summitGlory },
    { id: 4, title: 'Ocean Serenity', category: 'Landscape', description: 'Calm ocean waters reflecting the soft hues of a pastel sunset.', filename: IMAGES.oceanSerenity },
    { id: 5, title: 'Forest Whispers', category: 'Nature', description: 'Dappled sunlight filtering through an ancient forest canopy.', filename: IMAGES.forestWhispers, featured: true },
    { id: 6, title: 'Spring Bloom', category: 'Nature', description: 'A vibrant burst of wildflowers heralding the arrival of spring.', filename: IMAGES.springBloom, featured: true },
    { id: 7, title: 'Wild Encounters', category: 'Nature', description: 'A rare glimpse of wildlife in its undisturbed natural habitat.', filename: IMAGES.wildEncounters },
    { id: 8, title: 'Golden Hour', category: 'Nature', description: 'Nature transformed by the warm, fleeting glow of golden hour light.', filename: IMAGES.goldenHour },
    { id: 9, title: 'Portrait Study I', category: 'Portrait', description: 'An intimate portrait capturing authentic emotion and character.', filename: IMAGES.photoImage1, featured: true },
    { id: 10, title: 'Portrait Study II', category: 'Portrait', description: "A striking portrait that reveals the depth behind the subject's gaze.", filename: IMAGES.photoImage2, featured: true },
    { id: 11, title: 'Wedding Celebration', category: 'Events', subcategory: 'Marriage', albumId: 1, description: 'A joyful moment frozen in time from a beautiful wedding ceremony.', filename: IMAGES.photoMarriage },
    { id: 12, title: 'Waterfall Majesty', category: 'Nature', description: 'The raw power and beauty of a cascading waterfall in full flow.', filename: IMAGES.waterfallMajesty },
    { id: 13, title: 'Wedding Vows', category: 'Events', subcategory: 'Marriage', albumId: 1, description: 'An emotional exchange of vows captured in perfect light.', filename: IMAGES.photoMarriage },
    { id: 14, title: 'Birthday Bash', category: 'Events', subcategory: 'Birthday', albumId: 4, description: 'Candid moments from a vibrant birthday celebration full of laughter.', filename: IMAGES.goldenHour },
    { id: 15, title: 'Birthday Portraits', category: 'Events', subcategory: 'Birthday', albumId: 4, description: 'Joyful portraits from a milestone birthday party.', filename: IMAGES.photoImage1 },
    { id: 16, title: 'Evening Party', category: 'Events', subcategory: 'Party', albumId: 6, description: 'The energy and atmosphere of a lively evening gathering.', filename: IMAGES.forestWhispers },
    { id: 17, title: 'Celebration Night', category: 'Events', subcategory: 'Party', albumId: 6, description: 'Guests enjoying a beautifully decorated celebration venue.', filename: IMAGES.springBloom },
    { id: 18, title: 'Corporate Summit', category: 'Events', subcategory: 'Corporate', albumId: 8, description: 'Professional coverage of a high-profile corporate summit.', filename: IMAGES.mountainDreams },
    { id: 19, title: 'Team Headshots', category: 'Events', subcategory: 'Corporate', albumId: 8, description: 'Clean, professional headshots for a growing company team.', filename: IMAGES.photoImage2 },
    // Marriage album 2
    { id: 20, title: 'Reception Dance', category: 'Events', subcategory: 'Marriage', albumId: 2, description: 'The first dance at a magical evening reception.', filename: IMAGES.photoMarriage },
    { id: 21, title: 'Bridal Portrait', category: 'Events', subcategory: 'Marriage', albumId: 2, description: 'A stunning bridal portrait in natural light.', filename: IMAGES.photoImage1 },
    { id: 22, title: 'Garden Ceremony', category: 'Events', subcategory: 'Marriage', albumId: 2, description: 'An intimate garden ceremony surrounded by blooms.', filename: IMAGES.springBloom },
    // Marriage album 3
    { id: 23, title: 'Sunset Vows', category: 'Events', subcategory: 'Marriage', albumId: 3, description: 'Vows exchanged as the sun dipped below the horizon.', filename: IMAGES.goldenHour },
    { id: 24, title: 'Couple Portrait', category: 'Events', subcategory: 'Marriage', albumId: 3, description: 'A tender couple portrait after the ceremony.', filename: IMAGES.photoImage2 },
    // Birthday album 2
    { id: 25, title: 'Cake Cutting', category: 'Events', subcategory: 'Birthday', albumId: 5, description: 'The big moment — cutting the birthday cake.', filename: IMAGES.springBloom },
    { id: 26, title: 'Party Crowd', category: 'Events', subcategory: 'Birthday', albumId: 5, description: 'Friends and family gathered for a surprise birthday.', filename: IMAGES.forestWhispers },
    // Party album 2
    { id: 27, title: 'Rooftop Gathering', category: 'Events', subcategory: 'Party', albumId: 7, description: 'A stylish rooftop party with city views.', filename: IMAGES.summitGlory },
    { id: 28, title: 'Dance Floor', category: 'Events', subcategory: 'Party', albumId: 7, description: 'Guests dancing the night away.', filename: IMAGES.goldenHour },
    // Corporate album 2
    { id: 29, title: 'Product Launch', category: 'Events', subcategory: 'Corporate', albumId: 9, description: 'Capturing the energy of a major product launch event.', filename: IMAGES.oceanSerenity },
    { id: 30, title: 'Conference Panel', category: 'Events', subcategory: 'Corporate', albumId: 9, description: 'Industry leaders on stage at an annual conference.', filename: IMAGES.mountainDreams },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: "Working with this photographer was an absolute dream. Every shot from our wedding day tells a story — we couldn't be happier with the results.", clientName: 'Sarah & James Mitchell', rating: 5 },
    { id: 2, quote: 'The portrait session exceeded all my expectations. The photographer has a rare gift for making you feel at ease while capturing something truly special.', clientName: 'Elena Vasquez', rating: 5 },
    { id: 3, quote: 'I commissioned a series of landscape prints for my office and the quality is stunning. Each image has a depth and atmosphere that photographs rarely achieve.', clientName: 'David Okafor', rating: 4 },
    { id: 4, quote: 'Our corporate event was documented beautifully. Every key moment was captured with professionalism and a creative eye that set these photos apart.', clientName: 'Priya Sharma', rating: 5 },
];

export const SERVICES: Service[] = [
    { id: 1, title: 'Portrait Photography', description: 'Authentic, expressive portraits for individuals, couples, and families. Studio or on-location sessions tailored to your vision.', iconFilename: IMAGES.photoImage1, category: 'Portrait' },
    { id: 2, title: 'Landscape Photography', description: 'Fine-art landscape prints that bring the grandeur of the natural world into your home or workspace.', iconFilename: IMAGES.mountainDreams, category: 'Landscape' },
    { id: 3, title: 'Event Photography', description: 'Comprehensive coverage of weddings, corporate events, and celebrations — every meaningful moment preserved.', iconFilename: IMAGES.photoMarriage, category: 'Events' },
    { id: 4, title: 'Nature & Wildlife', description: 'Patient, respectful photography of flora and fauna in their natural environment, resulting in images full of life and wonder.', iconFilename: IMAGES.forestWhispers, category: 'Nature' },
];

export const WORK_CATEGORIES: WorkCategory[] = [
    { category: 'Landscape', coverFilename: IMAGES.mountainDreams, label: 'Landscape' },
    { category: 'Nature', coverFilename: IMAGES.forestWhispers, label: 'Nature' },
    { category: 'Portrait', coverFilename: IMAGES.photoImage1, label: 'Portrait' },
    { category: 'Events', coverFilename: IMAGES.photoMarriage, label: 'Events' },
];

export const EVENT_ALBUMS: EventAlbum[] = [
    {
        id: 1, name: 'Sarah & James', subcategory: 'Marriage', coverFilename: IMAGES.photoMarriage,
        photos: PHOTOS.filter(p => p.albumId === 1),
    },
    {
        id: 2, name: 'Priya & Rohan', subcategory: 'Marriage', coverFilename: IMAGES.photoImage1,
        photos: PHOTOS.filter(p => p.albumId === 2),
    },
    {
        id: 3, name: 'Elena & Marco', subcategory: 'Marriage', coverFilename: IMAGES.goldenHour,
        photos: PHOTOS.filter(p => p.albumId === 3),
    },
    {
        id: 4, name: "Aisha's 25th", subcategory: 'Birthday', coverFilename: IMAGES.goldenHour,
        photos: PHOTOS.filter(p => p.albumId === 4),
    },
    {
        id: 5, name: "David's Surprise", subcategory: 'Birthday', coverFilename: IMAGES.springBloom,
        photos: PHOTOS.filter(p => p.albumId === 5),
    },
    {
        id: 6, name: 'New Year Bash', subcategory: 'Party', coverFilename: IMAGES.forestWhispers,
        photos: PHOTOS.filter(p => p.albumId === 6),
    },
    {
        id: 7, name: 'Rooftop Soirée', subcategory: 'Party', coverFilename: IMAGES.summitGlory,
        photos: PHOTOS.filter(p => p.albumId === 7),
    },
    {
        id: 8, name: 'TechCorp Summit 2024', subcategory: 'Corporate', coverFilename: IMAGES.mountainDreams,
        photos: PHOTOS.filter(p => p.albumId === 8),
    },
    {
        id: 9, name: 'Nexus Product Launch', subcategory: 'Corporate', coverFilename: IMAGES.oceanSerenity,
        photos: PHOTOS.filter(p => p.albumId === 9),
    },
];

export const ABOUT_CONTENT: AboutContent = {
    biography: "Hi, I'm Aditya — a professional photographer who loves capturing real moments and genuine emotions. I work across weddings, fashion, and travel photography, helping people and brands tell their stories through clean, natural, and high-quality imagery. I believe great photos come from trust, comfort, and a shared creative vision.",
    specialties: ['Wedding Photography', 'Fashion & Editorial', 'Travel Photography', 'Nature & Wildlife'],
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
