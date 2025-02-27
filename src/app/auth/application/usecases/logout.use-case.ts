// src/app/auth/application/services/logout-user.service.ts

import { Injectable } from '@angular/core';
import { LogoutUserPort } from '../../domain/ports/in/logout.use-case.port';
import { AuthPortService } from '../../domain/ports/out/authport.service';


@Injectable({
  providedIn: 'root',
})
export class LogoutUseCaseService implements LogoutUserPort {
  constructor(private authService: AuthPortService) {}

  logout():void {
    this.authService.logout();
  }
}
