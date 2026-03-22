import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [LightboxComponent],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
    protected readonly portfolioService = inject(PortfolioService);
    private readonly route = inject(ActivatedRoute);
    private readonly titleService = inject(Title);
    private readonly metaService = inject(Meta);

    activeCategory = signal<string>('All');

    filteredPhotos = computed(() =>
        this.activeCategory() === 'All'
            ? this.portfolioService.photos
            : this.portfolioService.photos.filter(p => p.category === this.activeCategory())
    );

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
