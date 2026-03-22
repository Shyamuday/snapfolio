import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HeroComponent } from './sections/hero/hero.component';
import { FeaturedWorkComponent } from './sections/featured-work/featured-work.component';
import { PhilosophyComponent } from './sections/philosophy/philosophy.component';
import { OurWorkComponent } from './sections/our-work/our-work.component';
import { ServicesComponent } from './sections/services/services.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { CtaComponent } from './sections/cta/cta.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeroComponent,
        FeaturedWorkComponent,
        PhilosophyComponent,
        OurWorkComponent,
        ServicesComponent,
        TestimonialsComponent,
        CtaComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    constructor(private title: Title, private meta: Meta) {
        this.title.setTitle('Snapfolio | Photography Portfolio');
        this.meta.updateTag({
            name: 'description',
            content:
                'Snapfolio — professional photography portfolio showcasing landscapes, portraits, nature, and events.',
        });
        this.meta.updateTag({ property: 'og:title', content: 'Snapfolio | Photography Portfolio' });
        this.meta.updateTag({
            property: 'og:description',
            content:
                'Snapfolio — professional photography portfolio showcasing landscapes, portraits, nature, and events.',
        });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
    }
}
