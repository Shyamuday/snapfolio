import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    signal,
    computed,
    PLATFORM_ID,
    inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CarouselSlide {
    image: string;
    title: string;
    subtitle?: string;
}

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnDestroy {
    @Input({ required: true }) slides: CarouselSlide[] = [];
    /** Auto-advance interval in ms. Set to 0 to disable. */
    @Input() interval = 4000;

    private readonly platformId = inject(PLATFORM_ID);
    private timer: ReturnType<typeof setInterval> | null = null;

    activeIndex = signal(0);
    isAnimating = signal(false);

    total = computed(() => this.slides.length);
    current = computed(() => this.slides[this.activeIndex()]);

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId) && this.interval > 0) {
            this.startTimer();
        }
    }

    ngOnDestroy(): void {
        this.stopTimer();
    }

    goTo(index: number): void {
        if (index === this.activeIndex() || this.isAnimating()) return;
        this.isAnimating.set(true);
        this.activeIndex.set((index + this.total()) % this.total());
        setTimeout(() => this.isAnimating.set(false), 400);
        this.restartTimer();
    }

    prev(): void {
        this.goTo(this.activeIndex() - 1);
    }

    next(): void {
        this.goTo(this.activeIndex() + 1);
    }

    private startTimer(): void {
        this.timer = setInterval(() => this.next(), this.interval);
    }

    private stopTimer(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private restartTimer(): void {
        this.stopTimer();
        if (isPlatformBrowser(this.platformId) && this.interval > 0) {
            this.startTimer();
        }
    }
}
