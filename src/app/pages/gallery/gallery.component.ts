import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';
import { AlbumCardComponent } from '../../shared/album-card/album-card.component';
import { EventSubcategory, EventAlbum, Photo } from '../../core/data/portfolio.data';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [LightboxComponent, AlbumCardComponent],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
    protected readonly portfolioService = inject(PortfolioService);
    private readonly route = inject(ActivatedRoute);
    private readonly titleService = inject(Title);
    private readonly metaService = inject(Meta);

    activeCategory = signal<string>('All');
    activeSubcategory = signal<EventSubcategory | 'All'>('All');
    activeAlbum = signal<EventAlbum | null>(null);

    isEventsActive = computed(() => this.activeCategory() === 'Events');
    isSubcategoryActive = computed(() => this.isEventsActive() && this.activeSubcategory() !== 'All');

    albumsForSubcategory = computed(() => {
        const sub = this.activeSubcategory();
        if (sub === 'All') return [];
        return this.portfolioService.getAlbumsBySubcategory(sub);
    });

    filteredPhotos = computed((): Photo[] => {
        const album = this.activeAlbum();
        if (album) return album.photos;

        const cat = this.activeCategory();
        const sub = this.activeSubcategory();

        let photos = cat === 'All'
            ? this.portfolioService.photos
            : this.portfolioService.photos.filter(p => p.category === cat);

        if (cat === 'Events' && sub !== 'All') {
            photos = photos.filter(p => p.subcategory === sub);
        }
        return photos;
    });

    lightboxIndex = signal<number | null>(null);
    triggerElement: HTMLElement | null = null;

    constructor() {
        this.titleService.setTitle('Gallery | Snapfolio');
        this.metaService.updateTag({ name: 'description', content: 'Browse the full photo gallery — landscapes, nature, portraits, and events.' });
        this.metaService.updateTag({ property: 'og:title', content: 'Gallery | Snapfolio' });
        this.metaService.updateTag({ property: 'og:description', content: 'Browse the full photo gallery — landscapes, nature, portraits, and events.' });
    }

    ngOnInit(): void {
        const category = this.route.snapshot.queryParams['category'];
        if (category) {
            this.activeCategory.set(category);
        }
    }

    setCategory(cat: string): void {
        this.activeCategory.set(cat);
        this.activeSubcategory.set('All');
        this.activeAlbum.set(null);
    }

    setSubcategory(sub: EventSubcategory | 'All'): void {
        this.activeSubcategory.set(sub);
        this.activeAlbum.set(null);
    }

    openAlbum(album: EventAlbum): void {
        this.activeAlbum.set(album);
        this.lightboxIndex.set(null);
    }

    closeAlbum(): void {
        this.activeAlbum.set(null);
        this.lightboxIndex.set(null);
    }

    openLightbox(index: number, event: MouseEvent): void {
        this.triggerElement = event.currentTarget as HTMLElement;
        this.lightboxIndex.set(index);
    }

    closeLightbox(): void {
        this.lightboxIndex.set(null);
        this.triggerElement?.focus();
    }
}
