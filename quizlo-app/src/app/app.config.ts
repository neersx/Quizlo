import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/sharedmodule';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
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
