import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptor } from './infrastructure/interceptors/auth-http-response.interceptor';
import { AuthService } from './infrastructure/adapters/services/auth.service';
import { AUTH_PORT_SERVICE } from './domain/tokens/auth.tokens';
import { ApplicationConfig } from '@angular/core';



export const authConfig: ApplicationConfig  = {
    providers: [
        provideHttpClient(withInterceptors([authHttpInterceptor])),  // Solo para esta feature
        { provide: AUTH_PORT_SERVICE, useClass: AuthService },
    ],
};