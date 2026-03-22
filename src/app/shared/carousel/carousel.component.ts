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
    @Input() interval = 5000;

    private readonly platformId = inject(PLATFORM_ID);
    private timer: ReturnType<typeof setInterval> | null = null;

    activeIndex = signal(0);
    isAnimating = signal(false);
    /** Incremented on every slide change — forces text animation to re-trigger */
    animKey = signal(0);
    /** 0–100 progress for the progress bar */
    progress = signal(0);
    private progressTimer: ReturnType<typeof setInterval> | null = null;

    total = computed(() => this.slides.length);
    current = computed(() => this.slides[this.activeIndex()]);

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId) && this.interval > 0) {
            this.startTimer();
            this.startProgress();
        }
    }

    ngOnDestroy(): void {
        this.stopTimer();
        this.stopProgress();
    }

    goTo(index: number): void {
        if (index === this.activeIndex() || this.isAnimating()) return;
        this.isAnimating.set(true);
        this.activeIndex.set((index + this.total()) % this.total());
        this.animKey.update(k => k + 1);
        setTimeout(() => this.isAnimating.set(false), 700);
        this.restartTimer();
        this.restartProgress();
    }

    prev(): void { this.goTo(this.activeIndex() - 1); }
    next(): void { this.goTo(this.activeIndex() + 1); }

    private startTimer(): void {
        this.timer = setInterval(() => this.next(), this.interval);
    }

    private stopTimer(): void {
        if (this.timer) { clearInterval(this.timer); this.timer = null; }
    }

    private restartTimer(): void {
        this.stopTimer();
        if (isPlatformBrowser(this.platformId) && this.interval > 0) this.startTimer();
    }

    private startProgress(): void {
        const step = 100 / (this.interval / 50);
        this.progress.set(0);
        this.progressTimer = setInterval(() => {
            this.progress.update(p => Math.min(p + step, 100));
        }, 50);
    }

    private stopProgress(): void {
        if (this.progressTimer) { clearInterval(this.progressTimer); this.progressTimer = null; }
    }

    private restartProgress(): void {
        this.stopProgress();
        if (isPlatformBrowser(this.platformId) && this.interval > 0) this.startProgress();
    }
}
