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
  apiUrlVotar: string = 'https://sinabrobackend.onrender.com/valorarJugador';
  apiUrlGA: string = 'https://sinabrobackend.onrender.com/golesYAsistencias';
  apiUrlJugadores: string = 'https://sinabrobackend.onrender.com/recuperarJugadores'
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
