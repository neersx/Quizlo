import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/sharedmodule';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), 
    // 1) Router
    provideRouter(routes),

    // 2) HTTP + interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(              // polyfill fetch()
      withInterceptorsFromDi()    // use the HTTP_INTERCEPTORS token
    ),

    // 3) UI modules
    importProvidersFrom(
      SharedModule,               // any standalone @NgModule you need
      NgbModule,
      ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ),

    // 4) Animations
    provideAnimations(),         // or provideNoopAnimations() on the server

    // 5) SSR hydration (if you’re using it)
    provideClientHydration(withEventReplay())
  ]
};

// export function provideUniversalAnimations() {
//   const platformId = inject(PLATFORM_ID);
//   return isPlatformBrowser(platformId)
//     ? provideAnimations()
//     : provideNoopAnimations();
// }

