import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observer } from 'rxjs';
import { LoginService } from '../../login/services/login.service';
import { EquipoDTO } from '../model/equipo-dto.model';
import { Partido } from '../model/partido.model';
import { EquipoService } from '../service/equipo.service';

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent implements OnInit {

  equipos: EquipoDTO[] = [];
  partidos: Partido[] = [];
  loggedIn!: boolean;
  observerPartidos! : Observer<Partido[]>;

  selectedPartido: Partido | null = null;

  constructor(private readonly equipoService: EquipoService, private readonly loginService: LoginService, private readonly router: Router) { }
  ngOnInit(): void {
    if(!this.loginService.getIsLoggedIn()) {
      this.router.navigateByUrl('');
    }
    
     // Crear el Observer para manejar los datos y los errores
     const observerEquipos: Observer<EquipoDTO[]> = {
      next: (equipos) => {
        this.equipos = equipos;
        this.generarPartidos();
      },
      error: (error) => {
        console.error('Error al recuperar equipos:', error);
      },
      complete: () => {
        console.log('Recuperación de equipos completa');
      }
    };

    // Crear el Observer para manejar los datos y los errores
    this.observerPartidos = {
      next: (partidos) => {
        this.partidos = partidos;
      },
      error: (error) => {
        console.error('Error al recuperar partidos para el equipo:', error);
      },
      complete: () => {
        console.log('Recuperación de partidos completa');
      }
    };

    // Suscribirse usando el observer
    this.equipoService.recuperarEquipos().subscribe(observerEquipos);
    
    
  }

  // Método para seleccionar un equipo y mostrar sus jugadores
  selectPartido(partido: Partido): void {
    this.router.navigateByUrl('jugadores', {state: partido});
  }

  generarPartidos() {
    const equipo = this.equipos.find(equipo => equipo.nombre === 'Sinabro');
    if(equipo) {
      this.equipoService.recuperarPartidos(equipo.id).subscribe(this.observerPartidos);
    }
  }
   
}
