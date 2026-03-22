import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

const GALLERY_CATEGORIES = ['All', 'Landscape', 'Nature', 'Portrait', 'Events'] as const;

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private readonly router = inject(Router);
    private readonly platformId = inject(PLATFORM_ID);

    menuOpen = signal(false);
    galleryDropdownOpen = signal(false);
    mobileGalleryOpen = signal(false);

    readonly categories = GALLERY_CATEGORIES;

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe(() => {
                    this.menuOpen.set(false);
                    this.mobileGalleryOpen.set(false);
                });
        }
    }

    toggleMenu(): void {
        this.menuOpen.update(open => !open);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
        this.mobileGalleryOpen.set(false);
    }

    navigateGallery(category: string): void {
        this.galleryDropdownOpen.set(false);
        if (category === 'All') {
            this.router.navigate(['/gallery']);
        } else {
            this.router.navigate(['/gallery'], { queryParams: { category } });
        }
    }

    navigateGalleryMobile(category: string): void {
        this.closeMenu();
        if (category === 'All') {
            this.router.navigate(['/gallery']);
        } else {
            this.router.navigate(['/gallery'], { queryParams: { category } });
        }
    }
}
