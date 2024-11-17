import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JugadorDTO } from '../model/jugador-dto.model';
import { VotoDTO } from '../model/voto-dto.model';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(private readonly http: HttpClient) { }
  apiUrlVotar: string = 'http://localhost:8080/valorarJugador';
  apiUrlGA: string = 'http://localhost:8080/golesYAsistencias';
  apiUrlJugadores: string = 'http://localhost:8080/recuperarJugadores'
  valorarJugador(voto: VotoDTO): Observable<VotoDTO> {
    const body =  {
      ...voto
    };
    return this.http.put<VotoDTO>(this.apiUrlVotar, body);   
  }

  recuperarJugadores():Observable<JugadorDTO[]> {
    return this.http.get<JugadorDTO[]>(this.apiUrlJugadores);
  }
}
