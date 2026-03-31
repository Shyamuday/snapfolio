import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
})
export class ServicesComponent {
    private portfolioService = inject(PortfolioService);
    services = this.portfolioService.services;
}
