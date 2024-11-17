import { Partido } from "@/app/equipo/model/partido.model";
import { JugadorDTO } from "./jugador-dto.model";
import { LoginRequestDTO } from "@/app/login/model/login-request-dto.model";

export interface VotoDTO {
	jugador: JugadorDTO,
	partido: Partido,
	usuario: LoginRequestDTO,
	goles: number,
	asistencias: number,
	valoracion: number
}