import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoDTO } from '../model/equipo-dto.model';
import { Partido } from '../model/partido.model';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  equipos: EquipoDTO[] = [];
  apiUrlEquipos: string = 'http://localhost:8080/recuperarEquipos';
  apiUrlEquipo: string = 'http://localhost:8080/recuperarEquipo';
  apiUrlPartidos: string = 'http://localhost:8080/recuperarPartidos';
  constructor(private http: HttpClient) { }

  recuperarEquipos():Observable<EquipoDTO[]> {
    return this.http.get<EquipoDTO[]>(this.apiUrlEquipos);
  }

  recuperarEquipo(equipo: EquipoDTO): Observable<EquipoDTO> {
    return this.http.get<EquipoDTO>(this.apiUrlEquipo);
  }

  recuperarPartidos(equipoId: number){
    return this.http.get<Partido[]>(this.apiUrlPartidos+'/'+equipoId);
  }

}
