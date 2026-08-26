import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  // Gallery URLs are signed for one hour, so they must be fetched in the browser.
  { path: 'gallery', renderMode: RenderMode.Client },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender }
];
