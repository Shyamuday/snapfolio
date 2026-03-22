import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../../../core/services/portfolio.service';

@Component({
    selector: 'app-our-work',
    standalone: true,
    imports: [NgOptimizedImage, RouterLink],
    templateUrl: './our-work.component.html',
    styleUrl: './our-work.component.scss',
})
export class OurWorkComponent {
    private portfolioService = inject(PortfolioService);
    workCategories = this.portfolioService.workCategories;
}
