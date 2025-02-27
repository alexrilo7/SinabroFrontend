// src/app/auth/application/services/logout-user.service.ts

import { Injectable } from '@angular/core';
import { LoginUserPort } from '../../domain/ports/in/login.use-case.port';
import { AuthPortService } from '../../domain/ports/out/authport.service';


@Injectable({
  providedIn: 'root',
})
export class LoginUseCaseService implements LoginUserPort {
  constructor(private authService: AuthPortService) {}
    login(username: string, password: string): void {
        this.authService.login(username, password);
    }

  
}
