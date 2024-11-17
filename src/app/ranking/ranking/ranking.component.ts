import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JugadorDTO } from '../../jugador/model/jugador-dto.model';
import { LoginService } from '@/app/login/services/login.service';
import { Router } from '@angular/router';
import { JugadorService } from '@/app/jugador/service/jugador.service';
import { EquipoService } from '@/app/equipo/service/equipo.service';
import { Observer } from 'rxjs';
import { EquipoDTO } from '@/app/equipo/model/equipo-dto.model';
import { BotonVolverInicioComponent } from '@/app/shared-components/boton-volver-inicio/boton-volver-inicio.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, BotonVolverInicioComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{



  jugadoresOrdenados: JugadorDTO[] = [];
  jugadores: JugadorDTO[] = [];

  constructor(private readonly loginService: LoginService, private readonly router: Router, private readonly jugadoresService: JugadorService) { }

  ngOnInit(): void {
    if(!this.loginService.getIsLoggedIn()) {
      this.router.navigateByUrl('');
    }
    const observer: Observer<JugadorDTO[]> = {
      next: (jugadores) => {
        this.jugadores = jugadores;
        this.ordenarPor('valoracion');
      },
      error: (error) => {
        console.error('Error al recuperar jugadores:');
      },
      complete: () => {
        console.log('Recuperación de jugadores completa');
      }
    };
    this.jugadoresService.recuperarJugadores().subscribe(observer);
    
  }
  ordenarPor(criterio: string): void {
    this.jugadoresOrdenados = [...this.jugadores].sort((a, b) => {
      if (criterio === 'valoracion') {
        return b.valoracion - a.valoracion;
      } else if (criterio === 'goles') {
        return b.goles - a.goles;
      } else if (criterio === 'asistencias') {
        return b.asistencias - a.asistencias;
      }
      return 0;
    });
  }
}
