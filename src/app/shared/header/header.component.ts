import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe(() => this.menuOpen.set(false));
        }
    }

    toggleMenu(): void {
        this.menuOpen.update(open => !open);
    }

    closeMenu(): void {
        this.menuOpen.set(false);
    }
}
