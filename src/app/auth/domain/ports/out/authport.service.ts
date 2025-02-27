// src/app/auth/domain/authport.service.ts

import { Observable } from "rxjs";
import { Usuario } from "../../models/usuario.model";

export interface AuthPortService {
    get authenticated(): boolean;
    set authenticated(value: boolean);
    login(username: string, password: string): Observable<any>;
    logout(): void;
    registro(username: string, password: string): Observable<any>;
  }
  