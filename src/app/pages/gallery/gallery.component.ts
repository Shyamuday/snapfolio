import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';
import { AlbumCardComponent } from '../../shared/album-card/album-card.component';
import { Album, Photo, PhotoCategory, PhotoSubcategory } from '../../core/data/portfolio.data';

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

    activeCategory = signal<PhotoCategory | 'All'>('All');
    activeSubcategory = signal<PhotoSubcategory | 'All'>('All');
    activeAlbum = signal<Album | null>(null);

    // Whether the selected category uses the album/subcategory system (all non-All categories)
    isCategoryActive = computed(() => this.activeCategory() !== 'All');

    subcategoriesForCategory = computed(() => {
        const cat = this.activeCategory();
        if (cat === 'All') return [];
        return this.portfolioService.getSubcategories(cat);
    });

    albumsForView = computed(() => {
        const cat = this.activeCategory();
        const sub = this.activeSubcategory();
        if (cat === 'All') return [];
        if (sub === 'All') return this.portfolioService.getAlbumsByCategory(cat);
        return this.portfolioService.getAlbumsByCategoryAndSubcategory(cat, sub as PhotoSubcategory);
    });

    filteredPhotos = computed((): Photo[] => {
        const album = this.activeAlbum();
        if (album) return album.photos;
        // Only used for "All" category flat view
        return this.portfolioService.photos;
    });

    lightboxIndex = signal<number | null>(null);
    triggerElement: HTMLElement | null = null;

    constructor() {
        this.titleService.setTitle('Gallery | Aditya Deshmukh Photography');
        this.metaService.updateTag({ name: 'description', content: 'Browse the full photo gallery — landscapes, nature, portraits, and events.' });
        this.metaService.updateTag({ property: 'og:title', content: 'Gallery | Aditya Deshmukh Photography' });
        this.metaService.updateTag({ property: 'og:description', content: 'Browse the full photo gallery — landscapes, nature, portraits, and events.' });
    }

    ngOnInit(): void {
        const category = this.route.snapshot.queryParams['category'];
        if (category) {
            this.activeCategory.set(category as PhotoCategory);
        }
    }

    setCategory(cat: PhotoCategory | 'All'): void {
        this.activeCategory.set(cat);
        this.activeSubcategory.set('All');
        this.activeAlbum.set(null);
    }

    setSubcategory(sub: PhotoSubcategory | 'All'): void {
        this.activeSubcategory.set(sub);
        this.activeAlbum.set(null);
    }

    openAlbum(album: Album): void {
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
