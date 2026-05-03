import {
    Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy,
    signal, inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EventAlbum } from '../../core/data/portfolio.data';

@Component({
    selector: 'app-album-card',
    standalone: true,
    imports: [],
    templateUrl: './album-card.component.html',
    styleUrl: './album-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumCardComponent implements OnInit, OnDestroy {
    @Input({ required: true }) album!: EventAlbum;

    private readonly platformId = inject(PLATFORM_ID);

    activeIndex = signal(0);
    private timer: ReturnType<typeof setInterval> | null = null;

    get photos() {
        return this.album.photos.length > 0 ? this.album.photos : null;
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId) && this.album.photos.length > 1) {
            this.timer = setInterval(() => {
                this.activeIndex.update(i => (i + 1) % this.album.photos.length);
            }, 2500);
        }
    }

    ngOnDestroy(): void {
        if (this.timer) clearInterval(this.timer);
    }
}
