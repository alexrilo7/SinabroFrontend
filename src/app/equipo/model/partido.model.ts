import { EquipoDTO } from "./equipo-dto.model";

export interface Partido {
    equipoLocal: EquipoDTO;
    equipoVisitante: EquipoDTO;
    fecha: Date; // O puedes usar string si prefieres
  }