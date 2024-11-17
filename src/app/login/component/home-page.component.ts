import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LoginRequestDTO } from '../model/login-request-dto.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  email: string = '';
  password: string = '';
  esRegistro: boolean = false;
  errorMessage: string = '';

  constructor(private readonly loginService: LoginService, private readonly router: Router) { }
  ngOnInit(): void {

  }

  async login() {
    try {
      const response = await firstValueFrom(this.loginService.login(this.email, this.password));
      if (response.status === 200) {
        const usuario: LoginRequestDTO = {email: this.email, password: this.password};
        this.loginService.setUsuario(usuario);
        this.loginService.setIsLoggedIn(true);
        this.router.navigateByUrl('home');
      }

    } catch (error) {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.loginService.setIsLoggedIn(false);
    }
  }

  async registrar() {
    try {
      const response = await firstValueFrom(this.loginService.registrarUsuario(this.email, this.password));
      if (response.status === 200) {
        alert('Usuario registrado correctamente');
        this.errorMessage = '';
        this.esRegistro = false;
      }

    } catch (error) {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      alert('No se pudo registrar el usuario correctamente: ');
    }
  }

  toggleForm() {
    this.esRegistro = !this.esRegistro; // Cambia entre registro y login
    this.errorMessage = '';
  }
}
