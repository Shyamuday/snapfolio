import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { IMAGES } from '../../core/config/image-paths';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent {
    readonly image = IMAGES.photoMarriage;

    readonly contactItems = [
        { icon: 'phone', label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
        { icon: 'email', label: 'Email Us', value: 'aditya@photography.com', href: 'mailto:aditya@photography.com' },
        { icon: 'map', label: 'Find Us', value: 'Pune, Maharashtra', href: null },
    ];

    readonly socialLinks = [
        { name: 'Instagram', href: 'https://www.instagram.com/aditya_photography/', icon: IMAGES.instagramIcon },
        { name: 'WhatsApp', href: 'https://wa.me/919876543210', icon: IMAGES.whatsappIcon },
    ];

    constructor(private title: Title, private meta: Meta) {
        this.title.setTitle('Contact | Snapfolio');
        this.meta.updateTag({ name: 'description', content: 'Get in touch to book a session or inquire about prints.' });
    }
}
