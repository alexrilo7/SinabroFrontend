import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { authConfig } from '../../../auth.config';
import { AuthPortService } from '../../../domain/ports/out/authport.service';
import { AUTH_PORT_SERVICE } from '../../../domain/tokens/auth.tokens';
import { RegistroComponent } from '../registro/registro.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RegistroComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  esRegistro: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(AUTH_PORT_SERVICE) private authService: AuthPortService,
    private router: Router  // Inyectamos el servicio

  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).pipe(
        tap({
          next: (response) => {
            console.log('Login exitosoo', response.access_token);
            alert(response.access_token);
            this.authService.authenticated = true;
            this.router.navigateByUrl('/main');
          },
          /*error: (err) => {
            alert(err.error.error);
          }*/
        })
      ).subscribe();
    } else {
      console.log('Formulario no válido');
    }
  }

  toggleForm(): void {
    this.esRegistro = !this.esRegistro;
  }
}
