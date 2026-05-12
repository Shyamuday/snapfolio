import { Injectable } from '@angular/core';
import {
    Photo,
    PhotoCategory,
    PhotoSubcategory,
    Album,
    Testimonial,
    Service,
    WorkCategory,
    AboutContent,
    PhilosophyContent,
    PHOTOS,
    ALBUMS,
    TESTIMONIALS,
    SERVICES,
    WORK_CATEGORIES,
    SUBCATEGORIES,
    ABOUT_CONTENT,
    PHILOSOPHY_CONTENT,
} from '../data/portfolio.data';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
    readonly photos: Photo[] = PHOTOS;
    readonly testimonials: Testimonial[] = TESTIMONIALS;
    readonly services: Service[] = SERVICES;
    readonly workCategories: WorkCategory[] = WORK_CATEGORIES;
    readonly albums: Album[] = ALBUMS;
    readonly aboutContent: AboutContent = ABOUT_CONTENT;
    readonly philosophyContent: PhilosophyContent = PHILOSOPHY_CONTENT;

    // Backward compat
    get eventAlbums(): Album[] {
        return this.albums.filter(a => a.category === 'Wedding/Events');
    }

    get featuredPhotos(): Photo[] {
        return this.photos.filter(p => p.featured === true);
    }

    get categories(): PhotoCategory[] {
        return [...new Set(this.workCategories.map(wc => wc.category))];
    }

    getSubcategories(cat: PhotoCategory): PhotoSubcategory[] {
        return SUBCATEGORIES[cat] ?? [];
    }

    getAlbumsByCategory(cat: PhotoCategory): Album[] {
        return this.albums.filter(a => a.category === cat);
    }

    getAlbumsByCategoryAndSubcategory(cat: PhotoCategory, sub: PhotoSubcategory): Album[] {
        return this.albums.filter(a => a.category === cat && a.subcategory === sub);
    }
}
