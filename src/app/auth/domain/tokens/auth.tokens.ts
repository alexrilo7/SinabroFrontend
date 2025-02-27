// src/app/core/tokens/auth-token.ts

import { InjectionToken } from '@angular/core';
import { AuthPortService } from '../ports/out/authport.service';


// Crear un token para la interfaz AuthPortService
export const AUTH_PORT_SERVICE = new InjectionToken<AuthPortService>('AuthPortService');
