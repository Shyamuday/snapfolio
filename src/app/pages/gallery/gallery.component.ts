import { Component, OnInit, OnDestroy, signal, computed, inject, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ImageManifestService } from '../../core/services/image-manifest.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';

const PAGE_SIZE = 24;

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, LightboxComponent],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly manifestService = inject(ImageManifestService);
    private readonly route = inject(ActivatedRoute);
    private readonly titleService = inject(Title);
    private readonly metaService = inject(Meta);
    private readonly platformId = inject(PLATFORM_ID);

    @ViewChild('sentinel') sentinel!: ElementRef<HTMLDivElement>;
    private observer: IntersectionObserver | null = null;

    categories = signal<string[]>([]);
    activeCategory = signal<string>('All');
    imagesByCategory = signal<Record<string, string[]>>({});
    loadedImages = signal<Set<string>>(new Set());
    visibleCount = signal<number>(PAGE_SIZE);
    manifestLoaded = signal<boolean>(false);

    lightboxIndex = signal<number | null>(null);
    triggerElement: HTMLElement | null = null;

    /** Placeholder array for the loading skeleton grid */
    readonly skeletonItems = Array.from({ length: 24 }, (_, i) => i);

    /** All images for the active category */
    allImages = computed(() => {
        const cat = this.activeCategory();
        const all = this.imagesByCategory();
        return cat === 'All' ? Object.values(all).flat() : (all[cat] ?? []);
    });

    /** Only the slice currently rendered */
    visibleImages = computed(() =>
        this.allImages().slice(0, this.visibleCount())
    );

    hasMore = computed(() => this.visibleCount() < this.allImages().length);

    lightboxPhotos = computed(() =>
        this.allImages().map((src, i) => ({
            id: i,
            title: '',
            description: '',
            filename: src,
            category: 'Fashion' as any,
        }))
    );

    constructor() {
        this.titleService.setTitle('Gallery | Aditya Deshmukh Photography');
        this.metaService.updateTag({ name: 'description', content: 'Browse the full gallery — films, fashion, commercial, and wedding photography.' });
    }

    ngOnInit(): void {
        this.manifestService.getManifest().subscribe(manifest => {
            this.imagesByCategory.set(manifest);
            this.categories.set(Object.keys(manifest).sort());
            this.manifestLoaded.set(true);

            const cat = this.route.snapshot.queryParams['category'];
            if (cat && manifest[cat]) {
                this.activeCategory.set(cat);
            }
        });
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.setupObserver();
        }
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    private setupObserver(): void {
        this.observer?.disconnect();
        this.observer = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && this.hasMore()) {
                this.visibleCount.update(n => n + PAGE_SIZE);
            }
        }, { rootMargin: '400px' });

        if (this.sentinel?.nativeElement) {
            this.observer.observe(this.sentinel.nativeElement);
        }
    }

    setCategory(cat: string): void {
        this.activeCategory.set(cat);
        this.visibleCount.set(PAGE_SIZE);
        this.loadedImages.set(new Set());
        // Re-observe sentinel after view updates
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.setupObserver(), 50);
        }
    }

    onImageLoad(src: string): void {
        this.loadedImages.update(s => new Set([...s, src]));
    }

    isLoaded(src: string): boolean {
        return this.loadedImages().has(src);
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
