import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { authen } from './routes/auth.route';
import { MainQuizLayoutComponent } from './layouts/main-layout/main-layout.component';
import { content } from './routes/content.route';
import { PrivacyPolicy } from './pages/documents/privacy-policy/privacy-policy';
import { TermsAndConditions } from './pages/documents/terms-and-conditions/terms-and-conditions';
import { CancellationAndRefundPolicy } from './pages/documents/cancellation-and-refund-policy/cancellation-and-refund-policy';
import { Faqs } from './pages/documents/faqs/faqs';
import { ReportAbuse } from './pages/documents/report-abuse/report-abuse';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'privacy-policy',  component: PrivacyPolicy },
  { path: 'terms-and-conditions',  component: TermsAndConditions },
  { path: 'cancellation-and-refund-policy',  component: CancellationAndRefundPolicy },
  { path: 'faqs',  component: Faqs },
  { path: 'report-abuse',  component: ReportAbuse },
  
  { path: '', component: AuthenticationLayoutComponent, children: authen },
  { path: '', component: MainQuizLayoutComponent, children: content },

];