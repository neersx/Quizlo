import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { authen } from './routes/auth.route';
import { MainQuizLayoutComponent } from './layouts/main-layout/main-layout.component';
import { content } from './routes/content.route';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: '', component: AuthenticationLayoutComponent, children: authen },
  { path: '', component: MainQuizLayoutComponent, children: content },

];