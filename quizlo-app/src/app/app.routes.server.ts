import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'auth/login', renderMode: RenderMode.Client },
  { path: 'test', renderMode: RenderMode.Client },
  { path: 'test/live-test', renderMode: RenderMode.Client },
  { path: 'test/test-result', renderMode: RenderMode.Client },
  { path: 'test/select-exam', renderMode: RenderMode.Client },
];
