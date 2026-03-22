import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

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

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const existing = this.document.head.querySelector(
                'link[rel="preload"][href="assets/images/golden-hour.jpg"]'
            );
            if (!existing) {
                const link = this.document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = 'assets/images/golden-hour.jpg';
                this.document.head.appendChild(link);
            }
        }
    }
}
