import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'auth/login', renderMode: RenderMode.Client },
  { path: 'test', renderMode: RenderMode.Client },
  { path: 'test/live-test/:id', renderMode: RenderMode.Client },
  { path: 'test/test-result/:id', renderMode: RenderMode.Client },
  { path: 'test/select-exam', renderMode: RenderMode.Client },
  { path: 'test/test-window/:id', renderMode: RenderMode.Client },
  { path: 'blogs', renderMode: RenderMode.Client },
  { path: 'blogs/blog-details/:name', renderMode: RenderMode.Server },

  { path: 'user-profile', renderMode: RenderMode.Client },
  // { path: 'user-profile/edit:id', renderMode: RenderMode.Client },
];
