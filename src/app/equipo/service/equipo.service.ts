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
  apiUrlEquipos: string = 'https://sinabrobackend.onrender.com/recuperarEquipos';
  apiUrlEquipo: string = 'https://sinabrobackend.onrender.com/recuperarEquipo';
  apiUrlPartidos: string = 'https://sinabrobackend.onrender.com/recuperarPartidos';
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
