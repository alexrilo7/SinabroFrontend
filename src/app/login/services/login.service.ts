import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs'; // Importar Observable
import { LoginRequestDTO } from '../model/login-request-dto.model';
import { LoginResponse } from '../model/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://sinabrobackend.onrender.com/login'; // Cambia la URL según tu backend
  private apiUrlRegistro = 'https://sinabrobackend.onrender.com/registrarUsuario'; // Cambia la URL según tu backend
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  private usuario: LoginRequestDTO = {email: '', password: ''};
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<HttpResponse<LoginResponse>> {
    const loginReqDTO: LoginRequestDTO = { email, password };
    return this.http.post<LoginResponse>(this.apiUrl, loginReqDTO, { observe: 'response' });
  }

  registrarUsuario(email: string, password: string): Observable<HttpResponse<String>> {
    const loginReqDTO: LoginRequestDTO = { email, password };
    return this.http.post<String>(this.apiUrlRegistro, loginReqDTO, { observe: 'response' });
  }

  setIsLoggedIn(loggedIn: boolean) {
    this.isLoggedIn.next(true);
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn.value;
  }

  getUsuario(): LoginRequestDTO {
    return this.usuario;
  }

  setUsuario(usuario: LoginRequestDTO): void {
    this.usuario = usuario;
  }

}
