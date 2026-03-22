import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
})
export class ContactComponent {
    private readonly fb = inject(FormBuilder);

    submitted = signal(false);

    form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', Validators.required],
        message: ['', Validators.required],
    });

    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('Contact | Snapfolio');
        this.metaService.updateTag({ name: 'description', content: 'Get in touch to book a session or inquire about prints and commissions.' });
        this.metaService.updateTag({ property: 'og:title', content: 'Contact | Snapfolio' });
        this.metaService.updateTag({ property: 'og:description', content: 'Get in touch to book a session or inquire about prints and commissions.' });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.submitted.set(true);
            this.form.reset();
        } else {
            this.form.markAllAsTouched();
        }
    }

    get name() { return this.form.get('name'); }
    get email() { return this.form.get('email'); }
    get subject() { return this.form.get('subject'); }
    get message() { return this.form.get('message'); }
}
