import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
   { path: 'home', renderMode: RenderMode.Client },
   { path: 'auth/login', renderMode: RenderMode.Client },
];
