import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { IMAGES, RESPONSIVE_IMAGES } from '../../core/config/image-paths';
import { ResponsiveImageComponent } from '../../shared/responsive-image/responsive-image.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [ResponsiveImageComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent {
    protected readonly portfolioService = inject(PortfolioService);

    readonly profileImage = RESPONSIVE_IMAGES.aboutProfile;

    readonly contactInfo = [
        { label: 'Email', value: 'aditya@photography.com', icon: 'email', href: 'mailto:aditya@photography.com' },
        { label: 'Phone', value: '+91 98765 43210', icon: 'phone', href: 'tel:+919876543210' },
    ];

    readonly socialLinks = [
        { name: 'Instagram', url: 'https://www.instagram.com/aditya_photography/', icon: IMAGES.instagramIcon },
        { name: 'WhatsApp', url: 'https://wa.me/919876543210', icon: IMAGES.whatsappIcon },
    ];

    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('About | Snapfolio');
        this.metaService.updateTag({ name: 'description', content: 'Meet Aditya — a professional photographer with 12 years of experience in weddings, fashion, travel, and nature photography based in Pune, India.' });
        this.metaService.updateTag({ property: 'og:title', content: 'About Aditya | Snapfolio' });
        this.metaService.updateTag({ property: 'og:description', content: 'Professional photographer specialising in weddings, fashion, travel, and nature. Based in Pune, India.' });
        this.metaService.updateTag({ property: 'og:type', content: 'profile' });
        this.metaService.updateTag({ property: 'og:url', content: 'https://adityadeshmukhphotgraphy.netlify.app/about' });
        this.metaService.updateTag({ property: 'og:image', content: 'https://adityadeshmukhphotgraphy.netlify.app/assets/images/photo-image-1.JPG' });
        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.metaService.updateTag({ name: 'twitter:title', content: 'About Aditya | Snapfolio' });
        this.metaService.updateTag({ name: 'twitter:description', content: 'Professional photographer specialising in weddings, fashion, travel, and nature.' });
        this.metaService.updateTag({ name: 'twitter:image', content: 'https://adityadeshmukhphotgraphy.netlify.app/assets/images/photo-image-1.JPG' });
    }

    get about() {
        return this.portfolioService.aboutContent;
    }
}
