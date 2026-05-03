import { Component, signal, HostListener, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  showScrollTop = signal(false);
  pageVisible = signal(true);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.router.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => this.pageVisible.set(false));

    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        // small delay lets the new component render before fading in
        setTimeout(() => this.pageVisible.set(true), 30);
      });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    this.showScrollTop.set(scrolled >= total - 300);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
