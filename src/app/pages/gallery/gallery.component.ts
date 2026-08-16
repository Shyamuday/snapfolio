import {
    Component, OnInit, OnDestroy, AfterViewInit,
    signal, computed, inject, ElementRef, ViewChild, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { GalleryApiService, GalleryImage, GALLERY_CATEGORIES, GalleryCategory } from '../../core/services/gallery-api.service';
import { LightboxComponent } from '../../shared/lightbox/lightbox.component';

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
    private readonly router = inject(Router);
    private readonly titleService = inject(Title);
    private readonly metaService = inject(Meta);
    private readonly platformId = inject(PLATFORM_ID);

    @ViewChild('sentinel') sentinel!: ElementRef<HTMLDivElement>;
    private observer: IntersectionObserver | null = null;

    readonly categories = GALLERY_CATEGORIES;

    activeCategory = signal<GalleryCategory>('Corporate');
    images = signal<GalleryImage[]>([]);
    isLoading = signal(false);
    isInitialLoad = signal(true);

    private currentPage = 1;
    private hasNext = true;
    private loadingPage = false;

    // Skeleton placeholders — always show 4 initially
    readonly skeletonItems = Array.from({ length: 20 }, (_, i) => i);

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
        this.metaService.updateTag({ name: 'description', content: 'Browse the full gallery — fashion, corporate, wedding and product photography.' });
    }

    ngOnInit(): void {
        const cat = this.route.snapshot.queryParams['category'] as GalleryCategory;
        const validCat = this.categories.find(c => c === cat);
        this.activeCategory.set(validCat ?? 'Corporate');
        this.fetchPage();
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
        this.currentPage = 1;
        this.hasNext = true;
        this.loadingPage = false;
        this.isInitialLoad.set(true);
        this.router.navigate([], { queryParams: { category: cat }, replaceUrl: true });
        this.fetchPage();
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.setupObserver(), 100);
        }
    }

    private fetchPage(): void {
        if (this.loadingPage || !this.hasNext) return;
        this.loadingPage = true;
        this.isLoading.set(true);

        this.api.getImages(this.activeCategory(), this.currentPage).subscribe({
            next: result => {
                this.images.update(imgs => [...imgs, ...result.images]);
                this.currentPage++;
                this.hasNext = result.pagination.hasNext;
                this.isInitialLoad.set(false);
                this.isLoading.set(false);
                this.loadingPage = false;
            },
            error: (err) => {
                console.error('[Gallery] API error:', err);
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
                this.fetchPage();
            }
        }, { rootMargin: '600px' });
        if (this.sentinel?.nativeElement) {
            this.observer.observe(this.sentinel.nativeElement);
        }
    }

    onImgLoad(event: Event): void {
        const img = event.target as HTMLImageElement;
        const item = img.closest('.photo-item') as HTMLElement | null;
        if (item) item.classList.add('loaded');
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
