// ENTIDAD: Representa la tarea tal como existe en nuestro sistema
export interface Tarea {
  id: number;
  titulo: string;
  prioridad: string;
  completada: boolean;
  fechaCreacion: string;
}

// DTO: Representa los datos que exigimos al cliente para CREAR una tarea
export interface CrearTareaDto {
  titulo: string;
  prioridad: string;
}

export interface ActualizarTareaDto {
  titulo?: string;
  prioridad?: string;
  completada?: boolean;
}