export interface Alumno {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
  fechaInscripcion: string;
}

export interface CrearAlumnoDto {
  nombre: string;
  email: string;
}

export interface ActualizarAlumnoDto {
  nombre?: string;
  email?: string;
  activo?: boolean;
}