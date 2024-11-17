import { Partido } from '@/app/equipo/model/partido.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { EquipoDTO } from '../../equipo/model/equipo-dto.model';
import { EquipoService } from '../../equipo/service/equipo.service';
import { LoginService } from '../../login/services/login.service';
import { JugadorDTO } from '../model/jugador-dto.model';
import { VotoDTO } from '../model/voto-dto.model';
import { JugadorService } from '../service/jugador.service';
import { BotonVolverInicioComponent } from '@/app/shared-components/boton-volver-inicio/boton-volver-inicio.component';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule, BotonVolverInicioComponent],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent implements OnInit {
  equipo!: EquipoDTO;
  equipoNombre: string | null = null;
  votarJugadorObserver!: Observer<VotoDTO>;
  equiposObserver!: Observer<EquipoDTO[]>;
  partido!: Partido;
  votoActualizado!: VotoDTO;
  valoracionValue: number = 0;
  golesValue: number = 0;
  asistenciasValue: number = 0;
  jugadoresFormValues: { [key: number]: { valoracion: number, goles: number, asistencias: number } } = {};


  constructor(private route: ActivatedRoute, private readonly equipoService: EquipoService, private readonly loginService: LoginService, private router: Router, private readonly jugadorService: JugadorService) { }

  ngOnInit(): void {
    if (!this.loginService.getIsLoggedIn()) {
      this.router.navigateByUrl('');
    }
    this.partido = history.state;
    this.equiposObserver = {
      next: (equipos) => {
        // Buscar el equipo específico en el array recibido
        this.equipo = equipos.find(e => e.nombre === 'Sinabro')!;
        this.equipo.jugadores.forEach(jugador => {
          this.jugadoresFormValues[jugador.id] = {
            valoracion: 0,
            goles: 0,
            asistencias: 0
          };
        });
      },
      error: (error) => {
        console.error('Error al recuperar equipos:', error);
      },
      complete: () => {
        console.log('Recuperación de equipos completa');
      }
    };
    // Crear el Observer para manejar los datos y los errores
    this.votarJugadorObserver = {
      next: (votoActualizado) => {
        if (!votoActualizado) {
          alert('jugador ya votado, o error al realizar la votación.');
        } else {
          const index = this.equipo!.jugadores.findIndex(jugador => jugador.id === votoActualizado.jugador.id);
          if (index !== -1) {
            //this.equipo!.jugadores[index] = votoActualizado.jugador;
            this.equipo!.jugadores.splice(index, 1);
            alert('Jugador votado correctamente. Gracias!');
          }
        }
      },
      error: (error) => {
        console.error('Error al votar jugador:', error);
      },
      complete: () => {
        console.log('Votación completa');
      }
    };

    // Suscribirse al observable utilizando el Observer
    this.equipoService.recuperarEquipos().subscribe(this.equiposObserver);
   


  }

  // Método para valorar a un jugador
  valorarJugador(jugador: JugadorDTO, valoracion: number, goles: number, asistencias: number): void {
    if (valoracion < 0 || valoracion > 10) {
      alert("La valoración debe estar entre 0 y 10");
      return;
    }

    if (goles < 0) {
      alert("Los goles no pueden ser menores a 0");
      return;
    }

    if (asistencias < 0) {
      alert("Las asistencias no pueden ser menores a 0");
      return;
    }
    jugador.asistencias += asistencias;
    jugador.goles += goles;
    jugador.valoracion = (jugador.valoracion + valoracion) / 2;
    jugador.equipoId = this.equipo.id;

    const votoDTO: VotoDTO = {
      jugador: jugador,
      partido: this.partido,
      usuario: this.loginService.getUsuario(),
      goles: goles,
      asistencias: asistencias,
      valoracion: valoracion
    };
    this.jugadorService.valorarJugador(votoDTO).subscribe(this.votarJugadorObserver);


  }
}
