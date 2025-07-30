import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appShellRoutes } from './shell/shell.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.development';
import { ApiInterceptor } from './core/interceptors/api.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appShellRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
     {
      provide: HTTP_INTERCEPTORS,
      useValue: new ApiInterceptor(environment.baseUrl),
      multi: true
    }

  ]
};
