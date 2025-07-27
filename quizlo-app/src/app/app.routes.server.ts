import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  { path: '', renderMode: RenderMode.Prerender },
  { path: 'auth/login', renderMode: RenderMode.Client },
  { path: 'test', renderMode: RenderMode.Client },
  { path: 'test/live-test/:id', renderMode: RenderMode.Client },
  { path: 'test/test-result/:id', renderMode: RenderMode.Client },
  { path: 'test/select-exam', renderMode: RenderMode.Server },
  { path: 'test/test-window/:id', renderMode: RenderMode.Client },
  { path: 'test/my-tests', renderMode: RenderMode.Client },

  { path: 'blogs', renderMode: RenderMode.Server },
  { path: 'blogs/blog-details/:name', renderMode: RenderMode.Server },

  { path: 'user-profile', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender }
];
