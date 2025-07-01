import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { SharedModule } from './shared/sharedmodule';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

const serverConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideServerRendering(withRoutes(serverRoutes)),
    provideRouter(routes),
    provideAnimations(),
    provideNoopAnimations(),
    importProvidersFrom( // required by ngx-toastr if you want animations
      HttpClientModule,         // provides HttpClient
      NgbModule,
      SharedModule,
      ToastrModule.forRoot({    // <-- wires up ToastConfig & ToastrService
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
      })
    )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
