import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { appShellRoutes } from './shell/shell.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.development';
import { ApiInterceptor } from './core/interceptors/api.interceptors';

import en from '@angular/common/locales/en';
registerLocaleData(en);

/** config ng-zorro-antd i18n **/
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
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
    },
    provideNzI18n(en_US)
  ]
};
