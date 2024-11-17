import { JugadorDTO } from "../../jugador/model/jugador-dto.model";

export interface EquipoDTO {
    id: number;
    nombre: string;
	jugadores: JugadorDTO[];
}