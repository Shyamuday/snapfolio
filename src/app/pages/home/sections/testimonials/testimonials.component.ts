import { Component } from '@angular/core';

interface Testimonial {
    id: number;
    quote: string;
    clientName: string;
    rating: number;
}

const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: "Working with this photographer was an absolute dream. Every shot from our wedding day tells a story — we couldn't be happier with the results.", clientName: 'Sarah & James Mitchell', rating: 5 },
    { id: 2, quote: 'The portrait session exceeded all my expectations. The photographer has a rare gift for making you feel at ease while capturing something truly special.', clientName: 'Elena Vasquez', rating: 5 },
    { id: 3, quote: 'I commissioned a series of landscape prints for my office and the quality is stunning. Each image has a depth and atmosphere that photographs rarely achieve.', clientName: 'David Okafor', rating: 4 },
    { id: 4, quote: 'Our corporate event was documented beautifully. Every key moment was captured with professionalism and a creative eye that set these photos apart.', clientName: 'Priya Sharma', rating: 5 },
];

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [],
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
    readonly doubled = [...TESTIMONIALS, ...TESTIMONIALS];

    getStars(rating: number): number[] {
        return Array.from({ length: rating }, (_, i) => i);
    }
}
