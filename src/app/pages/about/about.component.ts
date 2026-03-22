import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent {
    protected readonly portfolioService = inject(PortfolioService);

    readonly contactInfo = [
        { label: 'Email', value: 'aditya@photography.com', icon: 'email', href: 'mailto:aditya@photography.com' },
        { label: 'Phone', value: '+91 98765 43210', icon: 'phone', href: 'tel:+919876543210' },
    ];

    readonly socialLinks = [
        { name: 'Instagram', url: 'https://www.instagram.com/aditya_photography/', icon: 'assets/images/Instagram_icon.png' },
        { name: 'WhatsApp', url: 'https://wa.me/919876543210', icon: 'assets/images/WhatsApp.svg.png' },
    ];

    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('About | Snapfolio');
        this.metaService.updateTag({ name: 'description', content: "Hi, I'm Aditya — a professional photographer capturing real moments across weddings, fashion, and travel." });
        this.metaService.updateTag({ property: 'og:title', content: 'About | Snapfolio' });
        this.metaService.updateTag({ property: 'og:description', content: "Professional photographer specialising in weddings, fashion, and travel." });
    }

    get about() {
        return this.portfolioService.aboutContent;
    }
}
