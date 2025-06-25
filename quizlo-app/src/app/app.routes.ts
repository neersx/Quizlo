import { Routes } from '@angular/router';

export const routes: Routes = [
  // ① default route → /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ② Home (lazy-loaded standalone component)
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },

  {
    path: 'auth/login',
    loadComponent: () =>
      import('../app/pages/identity/login/login').then((m) => m.Login),
  },

  // ③ Dashboard (lazy-loaded standalone component)
//   {
//     path: 'dashboard',
//     loadComponent: () =>
//       import('./pages/dashboard/dashboard.component').then(
//         (m) => m.DashboardComponent
//       ),
//   },

  // ④ Fallback → /home (keep this last)
  { path: '**', redirectTo: 'home' },
];