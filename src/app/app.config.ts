import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';


import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';
import { authHttpInterceptor } from './auth/infrastructure/interceptors/auth-http-response.interceptor';
import { authConfig } from './auth/auth.config';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    ...authConfig.providers
  ]
};
