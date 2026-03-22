// All hardcoded portfolio data constants for Snapfolio
import { IMAGES } from '../config/image-paths';

export type PhotoCategory = 'Landscape' | 'Nature' | 'Portrait' | 'Events';

export interface Photo {
    id: number;
    title: string;
    category: PhotoCategory;
    description: string;
    filename: string; // full path via IMAGES
    featured?: boolean;
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
    { id: 11, title: 'Wedding Celebration', category: 'Events', description: 'A joyful moment frozen in time from a beautiful wedding ceremony.', filename: IMAGES.photoMarriage },
    { id: 12, title: 'Waterfall Majesty', category: 'Nature', description: 'The raw power and beauty of a cascading waterfall in full flow.', filename: IMAGES.waterfallMajesty },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: "Working with this photographer was an absolute dream. Every shot from our wedding day tells a story — we couldn't be happier with the results.", clientName: 'Sarah & James Mitchell', rating: 5 },
    { id: 2, quote: 'The portrait session exceeded all my expectations. The photographer has a rare gift for making you feel at ease while capturing something truly special.', clientName: 'Elena Vasquez', rating: 5 },
    { id: 3, quote: 'I commissioned a series of landscape prints for my office and the quality is stunning. Each image has a depth and atmosphere that photographs rarely achieve.', clientName: 'David Okafor', rating: 4 },
    { id: 4, quote: 'Our corporate event was documented beautifully. Every key moment was captured with professionalism and a creative eye that set these photos apart.', clientName: 'Priya Sharma', rating: 5 },
];

export const SERVICES: Service[] = [
    { id: 1, title: 'Portrait Photography', description: 'Authentic, expressive portraits for individuals, couples, and families. Studio or on-location sessions tailored to your vision.', iconFilename: IMAGES.photoImage1 },
    { id: 2, title: 'Landscape Photography', description: 'Fine-art landscape prints that bring the grandeur of the natural world into your home or workspace.', iconFilename: IMAGES.mountainDreams },
    { id: 3, title: 'Event Photography', description: 'Comprehensive coverage of weddings, corporate events, and celebrations — every meaningful moment preserved.', iconFilename: IMAGES.photoMarriage },
    { id: 4, title: 'Nature & Wildlife', description: 'Patient, respectful photography of flora and fauna in their natural environment, resulting in images full of life and wonder.', iconFilename: IMAGES.forestWhispers },
];

export const WORK_CATEGORIES: WorkCategory[] = [
    { category: 'Landscape', coverFilename: IMAGES.mountainDreams, label: 'Landscape' },
    { category: 'Nature', coverFilename: IMAGES.forestWhispers, label: 'Nature' },
    { category: 'Portrait', coverFilename: IMAGES.photoImage1, label: 'Portrait' },
    { category: 'Events', coverFilename: IMAGES.photoMarriage, label: 'Events' },
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
