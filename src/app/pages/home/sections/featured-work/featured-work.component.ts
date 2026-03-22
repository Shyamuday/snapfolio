import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
    selector: 'app-featured-work',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    templateUrl: './featured-work.component.html',
    styleUrl: './featured-work.component.scss',
})
export class FeaturedWorkComponent {
    private readonly portfolioService = inject(PortfolioService);
    readonly featuredPhotos = this.portfolioService.featuredPhotos;
}
