import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { authConfig } from '../../../auth.config';
import { AuthPortService } from '../../../domain/ports/out/authport.service';
import { AUTH_PORT_SERVICE } from '../../../domain/tokens/auth.tokens';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(AUTH_PORT_SERVICE) private authService: AuthPortService // Inyectamos el servicio
  ) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    if (this.registroForm.valid) {
      const { username, password } = this.registroForm.value;
      this.authService.registro(username, password).pipe(
        tap({
          next: (response) => {
            console.log('Registro exitoso', response);
            alert(response.message);
            this.authService.authenticated = true;
          },

        })
      ).subscribe();
    } else {
      console.log('Formulario no válido');
    }
  }
}