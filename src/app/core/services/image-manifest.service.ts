import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';

export type ImageManifest = Record<string, string[]>;

@Injectable({ providedIn: 'root' })
export class ImageManifestService {
    private readonly http = inject(HttpClient);

    private readonly manifest$: Observable<ImageManifest> = this.http
        .get<ImageManifest>('image/manifest.json')
        .pipe(shareReplay(1));

    /** All categories found in the manifest */
    categories$: Observable<string[]> = this.manifest$.pipe(
        map(m => Object.keys(m).sort())
    );

    /** All images for a given category */
    getImages(category: string): Observable<string[]> {
        return this.manifest$.pipe(
            map(m => m[category] ?? [])
        );
    }

    /** Raw manifest */
    getManifest(): Observable<ImageManifest> {
        return this.manifest$;
    }
}
