// All hardcoded portfolio data constants for Aditya Deshmukh Photography
import { IMAGES } from '../config/image-paths';

export type PhotoCategory = 'Landscape' | 'Nature' | 'Portrait' | 'Events';

export type LandscapeSubcategory = 'Mountains' | 'Desert' | 'Ocean' | 'Sunrise';
export type NatureSubcategory = 'Forest' | 'Wildlife' | 'Flowers' | 'Waterfalls';
export type PortraitSubcategory = 'Individual' | 'Couples' | 'Family' | 'Fashion';
export type EventSubcategory = 'Marriage' | 'Birthday' | 'Party' | 'Corporate';

export type PhotoSubcategory = LandscapeSubcategory | NatureSubcategory | PortraitSubcategory | EventSubcategory;

export const SUBCATEGORIES: Record<PhotoCategory, PhotoSubcategory[]> = {
    Events: ['Marriage', 'Birthday', 'Party', 'Corporate'],
    Landscape: ['Mountains', 'Desert', 'Ocean', 'Sunrise'],
    Nature: ['Forest', 'Wildlife', 'Flowers', 'Waterfalls'],
    Portrait: ['Individual', 'Couples', 'Family', 'Fashion'],
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

// Keep EventAlbum alias for backward compat
export type EventAlbum = Album;

export const PHOTOS: Photo[] = [
    // ── Landscape ──────────────────────────────────────────────────────────
    { id: 1, title: 'Mountain Dreams', category: 'Landscape', subcategory: 'Mountains', albumId: 101, description: 'A breathtaking view of mountain peaks bathed in golden morning light.', filename: IMAGES.mountainDreams, featured: true },
    { id: 3, title: 'Summit Glory', category: 'Landscape', subcategory: 'Mountains', albumId: 101, description: 'A dramatic summit silhouetted against a vivid twilight sky.', filename: IMAGES.summitGlory },
    { id: 2, title: 'Desert Vastness', category: 'Landscape', subcategory: 'Desert', albumId: 102, description: 'The endless expanse of a sun-scorched desert stretching to the horizon.', filename: IMAGES.desertVastness, featured: true },
    { id: 31, title: 'Desert Dunes', category: 'Landscape', subcategory: 'Desert', albumId: 102, description: 'Rolling sand dunes sculpted by the wind into perfect curves.', filename: IMAGES.desertVastness },
    { id: 4, title: 'Ocean Serenity', category: 'Landscape', subcategory: 'Ocean', albumId: 103, description: 'Calm ocean waters reflecting the soft hues of a pastel sunset.', filename: IMAGES.oceanSerenity },
    { id: 32, title: 'Coastal Cliffs', category: 'Landscape', subcategory: 'Ocean', albumId: 103, description: 'Dramatic cliffs meeting the crashing waves below.', filename: IMAGES.oceanSerenity },
    { id: 33, title: 'Golden Sunrise', category: 'Landscape', subcategory: 'Sunrise', albumId: 104, description: 'The first light of dawn painting the sky in warm amber.', filename: IMAGES.goldenHour },
    { id: 34, title: 'Dawn Mist', category: 'Landscape', subcategory: 'Sunrise', albumId: 104, description: 'Morning mist rising over a tranquil valley at sunrise.', filename: IMAGES.mountainDreams },

    // ── Nature ─────────────────────────────────────────────────────────────
    { id: 5, title: 'Forest Whispers', category: 'Nature', subcategory: 'Forest', albumId: 201, description: 'Dappled sunlight filtering through an ancient forest canopy.', filename: IMAGES.forestWhispers, featured: true },
    { id: 35, title: 'Forest Path', category: 'Nature', subcategory: 'Forest', albumId: 201, description: 'A winding path disappearing into a dense green forest.', filename: IMAGES.forestWhispers },
    { id: 7, title: 'Wild Encounters', category: 'Nature', subcategory: 'Wildlife', albumId: 202, description: 'A rare glimpse of wildlife in its undisturbed natural habitat.', filename: IMAGES.wildEncounters },
    { id: 36, title: 'Morning Deer', category: 'Nature', subcategory: 'Wildlife', albumId: 202, description: 'A deer grazing peacefully in the early morning light.', filename: IMAGES.wildEncounters },
    { id: 6, title: 'Spring Bloom', category: 'Nature', subcategory: 'Flowers', albumId: 203, description: 'A vibrant burst of wildflowers heralding the arrival of spring.', filename: IMAGES.springBloom, featured: true },
    { id: 37, title: 'Petal Close-up', category: 'Nature', subcategory: 'Flowers', albumId: 203, description: 'Macro photography revealing the intricate beauty of a single petal.', filename: IMAGES.springBloom },
    { id: 12, title: 'Waterfall Majesty', category: 'Nature', subcategory: 'Waterfalls', albumId: 204, description: 'The raw power and beauty of a cascading waterfall in full flow.', filename: IMAGES.waterfallMajesty },
    { id: 8, title: 'Golden Hour', category: 'Nature', subcategory: 'Waterfalls', albumId: 204, description: 'A waterfall bathed in the warm glow of golden hour light.', filename: IMAGES.goldenHour },

    // ── Portrait ───────────────────────────────────────────────────────────
    { id: 9, title: 'Portrait Study I', category: 'Portrait', subcategory: 'Individual', albumId: 301, description: 'An intimate portrait capturing authentic emotion and character.', filename: IMAGES.photoImage1, featured: true },
    { id: 38, title: 'Studio Portrait', category: 'Portrait', subcategory: 'Individual', albumId: 301, description: 'A clean studio portrait with dramatic lighting.', filename: IMAGES.photoImage2 },
    { id: 10, title: 'Portrait Study II', category: 'Portrait', subcategory: 'Couples', albumId: 302, description: "A striking portrait that reveals the depth behind the subject's gaze.", filename: IMAGES.photoImage2, featured: true },
    { id: 39, title: 'Couple in Light', category: 'Portrait', subcategory: 'Couples', albumId: 302, description: 'A couple bathed in soft natural light, full of warmth.', filename: IMAGES.photoImage1 },
    { id: 40, title: 'Family Moment', category: 'Portrait', subcategory: 'Family', albumId: 303, description: 'A candid family portrait full of genuine laughter.', filename: IMAGES.photoImage1 },
    { id: 41, title: 'Family Outdoors', category: 'Portrait', subcategory: 'Family', albumId: 303, description: 'A family enjoying a sunny afternoon in the park.', filename: IMAGES.photoImage2 },
    { id: 42, title: 'Fashion Editorial', category: 'Portrait', subcategory: 'Fashion', albumId: 304, description: 'A bold fashion editorial shoot with striking composition.', filename: IMAGES.photoImage2 },
    { id: 43, title: 'Style Portrait', category: 'Portrait', subcategory: 'Fashion', albumId: 304, description: 'High-fashion portrait with dramatic styling and lighting.', filename: IMAGES.photoImage1 },

    // ── Events ─────────────────────────────────────────────────────────────
    { id: 11, title: 'Wedding Celebration', category: 'Events', subcategory: 'Marriage', albumId: 1, description: 'A joyful moment frozen in time from a beautiful wedding ceremony.', filename: IMAGES.photoMarriage },
    { id: 13, title: 'Wedding Vows', category: 'Events', subcategory: 'Marriage', albumId: 1, description: 'An emotional exchange of vows captured in perfect light.', filename: IMAGES.photoMarriage },
    { id: 20, title: 'Reception Dance', category: 'Events', subcategory: 'Marriage', albumId: 2, description: 'The first dance at a magical evening reception.', filename: IMAGES.photoMarriage },
    { id: 21, title: 'Bridal Portrait', category: 'Events', subcategory: 'Marriage', albumId: 2, description: 'A stunning bridal portrait in natural light.', filename: IMAGES.photoImage1 },
    { id: 22, title: 'Garden Ceremony', category: 'Events', subcategory: 'Marriage', albumId: 2, description: 'An intimate garden ceremony surrounded by blooms.', filename: IMAGES.springBloom },
    { id: 23, title: 'Sunset Vows', category: 'Events', subcategory: 'Marriage', albumId: 3, description: 'Vows exchanged as the sun dipped below the horizon.', filename: IMAGES.goldenHour },
    { id: 24, title: 'Couple Portrait', category: 'Events', subcategory: 'Marriage', albumId: 3, description: 'A tender couple portrait after the ceremony.', filename: IMAGES.photoImage2 },
    { id: 14, title: 'Birthday Bash', category: 'Events', subcategory: 'Birthday', albumId: 4, description: 'Candid moments from a vibrant birthday celebration full of laughter.', filename: IMAGES.goldenHour },
    { id: 15, title: 'Birthday Portraits', category: 'Events', subcategory: 'Birthday', albumId: 4, description: 'Joyful portraits from a milestone birthday party.', filename: IMAGES.photoImage1 },
    { id: 25, title: 'Cake Cutting', category: 'Events', subcategory: 'Birthday', albumId: 5, description: 'The big moment — cutting the birthday cake.', filename: IMAGES.springBloom },
    { id: 26, title: 'Party Crowd', category: 'Events', subcategory: 'Birthday', albumId: 5, description: 'Friends and family gathered for a surprise birthday.', filename: IMAGES.forestWhispers },
    { id: 16, title: 'Evening Party', category: 'Events', subcategory: 'Party', albumId: 6, description: 'The energy and atmosphere of a lively evening gathering.', filename: IMAGES.forestWhispers },
    { id: 17, title: 'Celebration Night', category: 'Events', subcategory: 'Party', albumId: 6, description: 'Guests enjoying a beautifully decorated celebration venue.', filename: IMAGES.springBloom },
    { id: 27, title: 'Rooftop Gathering', category: 'Events', subcategory: 'Party', albumId: 7, description: 'A stylish rooftop party with city views.', filename: IMAGES.summitGlory },
    { id: 28, title: 'Dance Floor', category: 'Events', subcategory: 'Party', albumId: 7, description: 'Guests dancing the night away.', filename: IMAGES.goldenHour },
    { id: 18, title: 'Corporate Summit', category: 'Events', subcategory: 'Corporate', albumId: 8, description: 'Professional coverage of a high-profile corporate summit.', filename: IMAGES.mountainDreams },
    { id: 19, title: 'Team Headshots', category: 'Events', subcategory: 'Corporate', albumId: 8, description: 'Clean, professional headshots for a growing company team.', filename: IMAGES.photoImage2 },
    { id: 29, title: 'Product Launch', category: 'Events', subcategory: 'Corporate', albumId: 9, description: 'Capturing the energy of a major product launch event.', filename: IMAGES.oceanSerenity },
    { id: 30, title: 'Conference Panel', category: 'Events', subcategory: 'Corporate', albumId: 9, description: 'Industry leaders on stage at an annual conference.', filename: IMAGES.mountainDreams },
];

export const ALBUMS: Album[] = [
    // Landscape
    { id: 101, name: 'Mountain Series', category: 'Landscape', subcategory: 'Mountains', coverFilename: IMAGES.mountainDreams, photos: PHOTOS.filter(p => p.albumId === 101) },
    { id: 102, name: 'Desert Landscapes', category: 'Landscape', subcategory: 'Desert', coverFilename: IMAGES.desertVastness, photos: PHOTOS.filter(p => p.albumId === 102) },
    { id: 103, name: 'Ocean Views', category: 'Landscape', subcategory: 'Ocean', coverFilename: IMAGES.oceanSerenity, photos: PHOTOS.filter(p => p.albumId === 103) },
    { id: 104, name: 'Sunrise Collection', category: 'Landscape', subcategory: 'Sunrise', coverFilename: IMAGES.goldenHour, photos: PHOTOS.filter(p => p.albumId === 104) },
    // Nature
    { id: 201, name: 'Forest Walks', category: 'Nature', subcategory: 'Forest', coverFilename: IMAGES.forestWhispers, photos: PHOTOS.filter(p => p.albumId === 201) },
    { id: 202, name: 'Wildlife Moments', category: 'Nature', subcategory: 'Wildlife', coverFilename: IMAGES.wildEncounters, photos: PHOTOS.filter(p => p.albumId === 202) },
    { id: 203, name: 'Bloom Season', category: 'Nature', subcategory: 'Flowers', coverFilename: IMAGES.springBloom, photos: PHOTOS.filter(p => p.albumId === 203) },
    { id: 204, name: 'Waterfall Series', category: 'Nature', subcategory: 'Waterfalls', coverFilename: IMAGES.waterfallMajesty, photos: PHOTOS.filter(p => p.albumId === 204) },
    // Portrait
    { id: 301, name: 'Solo Portraits', category: 'Portrait', subcategory: 'Individual', coverFilename: IMAGES.photoImage1, photos: PHOTOS.filter(p => p.albumId === 301) },
    { id: 302, name: 'Couple Sessions', category: 'Portrait', subcategory: 'Couples', coverFilename: IMAGES.photoImage2, photos: PHOTOS.filter(p => p.albumId === 302) },
    { id: 303, name: 'Family Portraits', category: 'Portrait', subcategory: 'Family', coverFilename: IMAGES.photoImage1, photos: PHOTOS.filter(p => p.albumId === 303) },
    { id: 304, name: 'Fashion Shoots', category: 'Portrait', subcategory: 'Fashion', coverFilename: IMAGES.photoImage2, photos: PHOTOS.filter(p => p.albumId === 304) },
    // Events
    { id: 1, name: 'Sarah & James', category: 'Events', subcategory: 'Marriage', coverFilename: IMAGES.photoMarriage, photos: PHOTOS.filter(p => p.albumId === 1) },
    { id: 2, name: 'Priya & Rohan', category: 'Events', subcategory: 'Marriage', coverFilename: IMAGES.photoImage1, photos: PHOTOS.filter(p => p.albumId === 2) },
    { id: 3, name: 'Elena & Marco', category: 'Events', subcategory: 'Marriage', coverFilename: IMAGES.goldenHour, photos: PHOTOS.filter(p => p.albumId === 3) },
    { id: 4, name: "Aisha's 25th", category: 'Events', subcategory: 'Birthday', coverFilename: IMAGES.goldenHour, photos: PHOTOS.filter(p => p.albumId === 4) },
    { id: 5, name: "David's Surprise", category: 'Events', subcategory: 'Birthday', coverFilename: IMAGES.springBloom, photos: PHOTOS.filter(p => p.albumId === 5) },
    { id: 6, name: 'New Year Bash', category: 'Events', subcategory: 'Party', coverFilename: IMAGES.forestWhispers, photos: PHOTOS.filter(p => p.albumId === 6) },
    { id: 7, name: 'Rooftop Soirée', category: 'Events', subcategory: 'Party', coverFilename: IMAGES.summitGlory, photos: PHOTOS.filter(p => p.albumId === 7) },
    { id: 8, name: 'TechCorp Summit 2024', category: 'Events', subcategory: 'Corporate', coverFilename: IMAGES.mountainDreams, photos: PHOTOS.filter(p => p.albumId === 8) },
    { id: 9, name: 'Nexus Product Launch', category: 'Events', subcategory: 'Corporate', coverFilename: IMAGES.oceanSerenity, photos: PHOTOS.filter(p => p.albumId === 9) },
];

// Backward compat alias
export const EVENT_ALBUMS = ALBUMS.filter(a => a.category === 'Events');

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
    { category: 'Events', coverFilename: IMAGES.photoMarriage, label: 'Events' },
    { category: 'Landscape', coverFilename: IMAGES.mountainDreams, label: 'Landscape' },
    { category: 'Nature', coverFilename: IMAGES.forestWhispers, label: 'Nature' },
    { category: 'Portrait', coverFilename: IMAGES.photoImage1, label: 'Portrait' },
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
