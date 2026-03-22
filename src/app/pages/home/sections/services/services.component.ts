import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
})
export class ServicesComponent {
    private portfolioService = inject(PortfolioService);
    services = this.portfolioService.services;
}
