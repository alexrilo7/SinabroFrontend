// src/app/auth/application/services/logout-user.service.ts

import { Injectable } from '@angular/core';
import { RegisterUserPort } from '../../domain/ports/in/register.use-case.port';
import { AuthPortService } from '../../domain/ports/out/authport.service';


@Injectable({
  providedIn: 'root',
})
export class RegisterUseCaseService implements RegisterUserPort {
  constructor(private authService: AuthPortService) {}

  registro(username: string, password: string): void {
    this.authService.registro(username,password);
  }
}
