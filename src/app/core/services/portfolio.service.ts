import { Injectable } from '@angular/core';
import {
    Photo,
    PhotoCategory,
    EventSubcategory,
    EventAlbum,
    Testimonial,
    Service,
    WorkCategory,
    AboutContent,
    PhilosophyContent,
    PHOTOS,
    TESTIMONIALS,
    SERVICES,
    WORK_CATEGORIES,
    EVENT_ALBUMS,
    ABOUT_CONTENT,
    PHILOSOPHY_CONTENT,
} from '../data/portfolio.data';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
    readonly photos: Photo[] = PHOTOS;
    readonly testimonials: Testimonial[] = TESTIMONIALS;
    readonly services: Service[] = SERVICES;
    readonly workCategories: WorkCategory[] = WORK_CATEGORIES;
    readonly eventAlbums: EventAlbum[] = EVENT_ALBUMS;
    readonly aboutContent: AboutContent = ABOUT_CONTENT;
    readonly philosophyContent: PhilosophyContent = PHILOSOPHY_CONTENT;

    readonly eventSubcategories: EventSubcategory[] = ['Marriage', 'Birthday', 'Party', 'Corporate'];

    get featuredPhotos(): Photo[] {
        return this.photos.filter(p => p.featured === true);
    }

    get categories(): PhotoCategory[] {
        return [...new Set(this.workCategories.map(wc => wc.category))];
    }

    getAlbumsBySubcategory(sub: EventSubcategory): EventAlbum[] {
        return this.eventAlbums.filter(a => a.subcategory === sub);
    }
}
