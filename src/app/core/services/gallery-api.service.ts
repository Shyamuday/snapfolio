import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_URL = 'https://iqwjs2qhag.execute-api.ap-south-1.amazonaws.com/dev';

export const GALLERY_CATEGORIES = ['Corporate', 'Fashion', 'Wedding', 'Product'] as const;
export type GalleryCategory = typeof GALLERY_CATEGORIES[number];

export interface GalleryImage {
    key: string;
    eventType: string;
    fileName: string;
    url: string;
}

export interface GalleryPageResult {
    images: GalleryImage[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}

@Injectable({ providedIn: 'root' })
export class GalleryApiService {
    private readonly http = inject(HttpClient);

    getImages(eventType: string, page: number, limit = 20): Observable<GalleryPageResult> {
        return this.http
            .post<{ body: GalleryPageResult }>(API_URL, { eventType, page, limit })
            .pipe(map(res => res.body));
    }
}
