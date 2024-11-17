import { EquipoDTO } from "@/app/equipo/model/equipo-dto.model";

export interface JugadorDTO {
	id: number;
    nombre: string;
    apellidos: string;
	dorsal: number;
	valoracion: number;
	goles: number;
	asistencias: number;
	equipoId: number;
}