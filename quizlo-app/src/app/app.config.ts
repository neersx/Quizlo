import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { PLATFORM_ID, inject }              from '@angular/core';
import { isPlatformBrowser }                from '@angular/common';
import { routes } from './app.routes';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/sharedmodule';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),               // ← enables fetch() support
      withInterceptorsFromDi()   // ← lets @Inject(HttpInterceptor) still work
    ),
    importProvidersFrom( // required by ngx-toastr if you want animations
      HttpClientModule,         // provides HttpClient
      NgbModule,
      SharedModule,
      ToastrModule.forRoot({    // <-- wires up ToastConfig & ToastrService
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
      })
    ),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};

// export function provideUniversalAnimations() {
//   const platformId = inject(PLATFORM_ID);
//   return isPlatformBrowser(platformId)
//     ? provideAnimations()
//     : provideNoopAnimations();
// }

