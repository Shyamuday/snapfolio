import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CarouselComponent, CarouselSlide } from '../../shared/carousel/carousel.component';
import { PhilosophyComponent } from './sections/philosophy/philosophy.component';
import { ServicesComponent } from './sections/services/services.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { IMAGES } from '../../core/config/image-paths';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CarouselComponent,
        PhilosophyComponent,
        ServicesComponent,
        TestimonialsComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {
    readonly slides: CarouselSlide[] = [
        { image: IMAGES.goldenHour, title: 'Golden Hour', subtitle: 'Nature' },
        { image: IMAGES.mountainDreams, title: 'Mountain Dreams', subtitle: 'Landscape' },
        { image: IMAGES.forestWhispers, title: 'Forest Whispers', subtitle: 'Nature' },
        { image: IMAGES.desertVastness, title: 'Desert Vastness', subtitle: 'Landscape' },
        { image: IMAGES.oceanSerenity, title: 'Ocean Serenity', subtitle: 'Landscape' },
        { image: IMAGES.photoImage1, title: 'Portrait Study', subtitle: 'Portrait' },
    ];
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
