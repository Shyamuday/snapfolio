import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
    private portfolioService = inject(PortfolioService);
    testimonials = this.portfolioService.testimonials;

    getStars(rating: number): number[] {
        return Array.from({ length: rating }, (_, i) => i);
    }
}
