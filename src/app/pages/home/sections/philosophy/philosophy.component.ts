import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
    selector: 'app-philosophy',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './philosophy.component.html',
    styleUrl: './philosophy.component.scss',
})
export class PhilosophyComponent {
    private readonly portfolioService = inject(PortfolioService);
    philosophy = this.portfolioService.philosophyContent;
}
