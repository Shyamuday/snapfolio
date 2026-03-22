import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    ElementRef,
    HostListener,
    signal,
    computed,
    inject,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Photo } from '../../core/data/portfolio.data';

@Component({
    selector: 'app-lightbox',
    standalone: true,
    imports: [],
    templateUrl: './lightbox.component.html',
    styleUrl: './lightbox.component.scss',
})
export class LightboxComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() photos: Photo[] = [];
    @Input() activeIndex: number = 0;
    @Output() close = new EventEmitter<void>();

    @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>;

    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);

    currentIndex = signal(0);

    currentPhoto = computed(() => this.photos[this.currentIndex()]);
    hasPrev = computed(() => this.currentIndex() > 0);
    hasNext = computed(() => this.currentIndex() < this.photos.length - 1);

    ngOnInit(): void {
        this.currentIndex.set(this.activeIndex);
        if (isPlatformBrowser(this.platformId)) {
            this.document.body.style.overflow = 'hidden';
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.document.body.style.overflow = '';
        }
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.closeBtn?.nativeElement?.focus();
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.close.emit();
        } else if (event.key === 'ArrowLeft') {
            this.prev();
        } else if (event.key === 'ArrowRight') {
            this.next();
        }
    }

    prev(): void {
        if (this.hasPrev()) {
            this.currentIndex.update(i => i - 1);
        }
    }

    next(): void {
        if (this.hasNext()) {
            this.currentIndex.update(i => i + 1);
        }
    }

    onBackdropClick(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.close.emit();
        }
    }
}
