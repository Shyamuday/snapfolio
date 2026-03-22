import { Component, Input } from '@angular/core';
import { ResponsiveImage } from '../../core/config/image-paths';

/**
 * Renders a <picture> element with three <source> breakpoints.
 * The browser picks the first matching source — no JS involved.
 *
 * Usage:
 *   <app-responsive-image [image]="RESPONSIVE_IMAGES.hero" [priority]="true" />
 *
 * Breakpoints mirror the global SCSS mixins:
 *   mobile  → max-width: 767px
 *   tablet  → 768px – 1279px
 *   desktop → min-width: 1280px  (also the <img> fallback)
 */
@Component({
    selector: 'app-responsive-image',
    standalone: true,
    template: `
    <picture>
      <source [attr.srcset]="image.mobile"  media="(max-width: 767px)" />
      <source [attr.srcset]="image.tablet"  media="(min-width: 768px) and (max-width: 1279px)" />
      <source [attr.srcset]="image.desktop" media="(min-width: 1280px)" />
      <img
        [src]="image.desktop"
        [alt]="alt || image.alt"
        [attr.width]="width"
        [attr.height]="height"
        [attr.loading]="priority ? 'eager' : 'lazy'"
        [attr.fetchpriority]="priority ? 'high' : 'auto'"
        [class]="imgClass"
      />
    </picture>
  `,
    styles: [`
    picture { display: contents; }
  `],
})
export class ResponsiveImageComponent {
    /** The responsive image definition from RESPONSIVE_IMAGES */
    @Input({ required: true }) image!: ResponsiveImage;

    /** Override the alt text from the image definition if needed */
    @Input() alt = '';

    /** Intrinsic width for layout shift prevention */
    @Input() width: number | null = null;

    /** Intrinsic height for layout shift prevention */
    @Input() height: number | null = null;

    /** Set true for above-the-fold images (sets loading=eager, fetchpriority=high) */
    @Input() priority = false;

    /** Extra CSS class(es) applied to the <img> element */
    @Input() imgClass = '';
}
