import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent {

    readonly contactItems = [
        { icon: 'phone', label: 'Call Us', value: '+91 90228 00857', href: 'tel:+919022800857' },
        { icon: 'email', label: 'Email Us', value: 'adityadeshmukhadi@gmail.com', href: 'mailto:adityadeshmukhadi@gmail.com' },
        { icon: 'map', label: 'Find Us', value: 'Pune, Maharashtra', href: null },
    ];

    readonly socialLinks = [
        { name: 'Instagram', href: 'https://www.instagram.com/addy_d_0607?igsh=dnBvN2hneHNidHhs&utm_source=qr', icon: 'instagram' },
        { name: 'WhatsApp', href: 'https://wa.me/919022800857', icon: 'whatsapp' },
    ];

    constructor(private title: Title, private meta: Meta) {
        this.title.setTitle('Contact | Aditya Deshmukh Photography');
        this.meta.updateTag({ name: 'description', content: 'Get in touch with Aditya to book a photography session, commission a print, or just say hello. Based in Pune, India.' });
        this.meta.updateTag({ property: 'og:title', content: 'Contact Aditya Deshmukh Photography' });
        this.meta.updateTag({ property: 'og:description', content: 'Book a session or inquire about prints. Based in Pune, India.' });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: 'https://adityadeshmukhphotgraphy.netlify.app/contact' });
        this.meta.updateTag({ property: 'og:image', content: 'https://adityadeshmukhphotgraphy.netlify.app/assets/images/photo-marriage.jpg' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: 'Contact Aditya Deshmukh Photography' });
        this.meta.updateTag({ name: 'twitter:description', content: 'Book a photography session or inquire about prints.' });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://adityadeshmukhphotgraphy.netlify.app/assets/images/photo-marriage.jpg' });
    }
}
