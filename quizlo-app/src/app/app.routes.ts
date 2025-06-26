import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './pages/identity/login/login';
import { LandingPageLayout } from './layouts/landing-page-layout/landing-page-layout';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { authen } from './routes/auth.route';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: '', component: AuthenticationLayoutComponent, children: authen },

];