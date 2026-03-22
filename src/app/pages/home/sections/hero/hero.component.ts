import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RESPONSIVE_IMAGES } from '../../../../core/config/image-paths';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);

    readonly hero = RESPONSIVE_IMAGES.hero;

    ngOnInit(): void {
        // Preload the desktop hero; browser will pick the right source at runtime
        if (isPlatformBrowser(this.platformId)) {
            const existing = this.document.head.querySelector(
                `link[rel="preload"][href="${this.hero.desktop}"]`
            );
            if (!existing) {
                const link = this.document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = this.hero.desktop;
                this.document.head.appendChild(link);
            }
        }
    }
}
