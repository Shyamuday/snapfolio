import {
    Component, OnInit, OnDestroy, AfterViewInit,
    signal, computed, inject, ElementRef, ViewChild, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { GalleryApiService, GalleryImage, GALLERY_CATEGORIES, GalleryCategory } from '../../core/services/gallery-api.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';

const PAGE_LIMIT = 24;

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, LightboxComponent],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly api = inject(GalleryApiService);
    private readonly route = inject(ActivatedRoute);
    private readonly titleService = inject(Title);
    private readonly metaService = inject(Meta);
    private readonly platformId = inject(PLATFORM_ID);

    @ViewChild('sentinel') sentinel!: ElementRef<HTMLDivElement>;
    private observer: IntersectionObserver | null = null;

    readonly categories = GALLERY_CATEGORIES;

    activeCategory = signal<GalleryCategory>('All');
    images = signal<GalleryImage[]>([]);
    loadedUrls = signal<Set<string>>(new Set());
    isLoading = signal(false);
    isInitialLoad = signal(true);

    private currentPage = 1;
    private hasNext = true;
    private loadingPage = false;

    // For "All" mode we cycle through categories
    private allCategoryIndex = 0;
    private allCategoryPages: Record<string, { page: number; hasNext: boolean }> = {};

    readonly skeletonItems = Array.from({ length: PAGE_LIMIT }, (_, i) => i);

    lightboxIndex = signal<number | null>(null);
    triggerElement: HTMLElement | null = null;

    lightboxPhotos = computed(() =>
        this.images().map((img, i) => ({
            id: i,
            title: img.fileName,
            description: '',
            filename: img.url,
            category: img.eventType as any,
        }))
    );

    constructor() {
        this.titleService.setTitle('Gallery | Aditya Deshmukh Photography');
        this.metaService.updateTag({ name: 'description', content: 'Browse the full gallery — films, fashion, commercial, and wedding photography.' });
    }

    ngOnInit(): void {
        const cat = this.route.snapshot.queryParams['category'] as GalleryCategory;
        if (cat && cat !== 'All') {
            this.activeCategory.set(cat);
        }
        this.loadNextPage();
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.setupObserver();
        }
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    setCategory(cat: GalleryCategory): void {
        if (cat === this.activeCategory()) return;
        this.activeCategory.set(cat);
        this.images.set([]);
        this.loadedUrls.set(new Set());
        this.currentPage = 1;
        this.hasNext = true;
        this.loadingPage = false;
        this.allCategoryIndex = 0;
        this.allCategoryPages = {};
        this.isInitialLoad.set(true);
        this.loadNextPage();
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.setupObserver(), 100);
        }
    }

    private loadNextPage(): void {
        if (this.loadingPage) return;

        const cat = this.activeCategory();

        if (cat === 'All') {
            this.loadNextAllPage();
        } else {
            if (!this.hasNext) return;
            this.fetchPage(cat, this.currentPage);
        }
    }

    private loadNextAllPage(): void {
        // Round-robin through categories for "All" view
        const cats = [...GALLERY_CATEGORIES];
        let attempts = 0;

        while (attempts < cats.length) {
            const cat = cats[this.allCategoryIndex % cats.length];
            const state = this.allCategoryPages[cat] ?? { page: 1, hasNext: true };

            if (state.hasNext) {
                this.fetchPage(cat, state.page, true);
                return;
            }

            this.allCategoryIndex++;
            attempts++;
        }
        // All categories exhausted
        this.hasNext = false;
    }

    private fetchPage(eventType: string, page: number, isAll = false): void {
        this.loadingPage = true;
        this.isLoading.set(true);

        this.api.getImages(eventType, page, PAGE_LIMIT).subscribe({
            next: result => {
                this.images.update(imgs => [...imgs, ...result.images]);
                this.isInitialLoad.set(false);
                this.isLoading.set(false);
                this.loadingPage = false;

                if (isAll) {
                    this.allCategoryPages[eventType] = {
                        page: page + 1,
                        hasNext: result.pagination.hasNext,
                    };
                    this.allCategoryIndex++;
                    // Check if any category still has pages
                    const cats = [...GALLERY_CATEGORIES];
                    this.hasNext = cats.some(c => {
                        const s = this.allCategoryPages[c];
                        return !s || s.hasNext;
                    });
                } else {
                    this.currentPage = page + 1;
                    this.hasNext = result.pagination.hasNext;
                }
            },
            error: () => {
                this.isLoading.set(false);
                this.loadingPage = false;
                this.isInitialLoad.set(false);
            }
        });
    }

    private setupObserver(): void {
        this.observer?.disconnect();
        this.observer = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && !this.loadingPage && this.hasNext) {
                this.loadNextPage();
            }
        }, { rootMargin: '400px' });

        if (this.sentinel?.nativeElement) {
            this.observer.observe(this.sentinel.nativeElement);
        }
    }

    onImageLoad(url: string): void {
        this.loadedUrls.update(s => new Set([...s, url]));
    }

    isLoaded(url: string): boolean {
        return this.loadedUrls().has(url);
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
