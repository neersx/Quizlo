import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/identity/login/login';

export const routes: Routes = [
  // ① default route → /home
  { path: '',      redirectTo: 'home', pathMatch: 'full' },  // ← default
  { path: 'home',  component: HomeComponent },
  { path: 'auth/login', component: Login },
  // … any other client routes …
  { path: '**',    redirectTo: 'home' } 
];