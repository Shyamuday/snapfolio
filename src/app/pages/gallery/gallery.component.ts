import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';
import { AlbumCardComponent } from '../../shared/album-card/album-card.component';
import { Album, Photo, PhotoCategory } from '../../core/data/portfolio.data';

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
    activeAlbum = signal<Album | null>(null);
    loadedImages = signal<Set<number>>(new Set());

    albumsForView = computed(() => {
        const cat = this.activeCategory();
        if (cat === 'All') return this.portfolioService.albums;
        return this.portfolioService.getAlbumsByCategory(cat);
    });

    filteredPhotos = computed((): Photo[] => {
        const album = this.activeAlbum();
        if (album) return album.photos;
        return this.portfolioService.photos;
    });

    breadcrumbs = computed(() => {
        const cat = this.activeCategory();
        const album = this.activeAlbum();
        const crumbs: { label: string; action: () => void }[] = [];
        if (cat !== 'All') {
            crumbs.push({ label: cat, action: () => this.setCategory(cat) });
            if (album) {
                crumbs.push({ label: album.name, action: () => { } });
            }
        }
        return crumbs;
    });

    lightboxIndex = signal<number | null>(null);
    triggerElement: HTMLElement | null = null;

    constructor() {
        this.titleService.setTitle('Gallery | Aditya Deshmukh Photography');
        this.metaService.updateTag({ name: 'description', content: 'Browse the full gallery — films, fashion, commercial, and wedding photography.' });
        this.metaService.updateTag({ property: 'og:title', content: 'Gallery | Aditya Deshmukh Photography' });
        this.metaService.updateTag({ property: 'og:description', content: 'Browse the full gallery — films, fashion, commercial, and wedding photography.' });
    }

    ngOnInit(): void {
        const category = this.route.snapshot.queryParams['category'];
        if (category) {
            this.activeCategory.set(category as PhotoCategory);
        }
    }

    setCategory(cat: PhotoCategory | 'All'): void {
        this.activeCategory.set(cat);
        this.activeAlbum.set(null);
        this.loadedImages.set(new Set());
    }

    openAlbum(album: Album): void {
        this.activeAlbum.set(album);
        this.lightboxIndex.set(null);
        this.loadedImages.set(new Set());
    }

    closeAlbum(): void {
        this.activeAlbum.set(null);
        this.lightboxIndex.set(null);
        this.loadedImages.set(new Set());
    }

    onImageLoad(id: number): void {
        this.loadedImages.update(s => new Set([...s, id]));
    }

    isImageLoaded(id: number): boolean {
        return this.loadedImages().has(id);
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
