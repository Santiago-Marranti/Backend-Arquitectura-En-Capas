import { AlumnosRepository } from "./alumnos.repository.js";
import { Alumno, CrearAlumnoDto } from "./alumno.js";
import { AppError } from "../errors/app-error.js";

export class AlumnosService {
  constructor(private readonly repository: AlumnosRepository) { }

  crear(dto: CrearAlumnoDto): Alumno {
    // Regla de negocio: El email debe ser único
    const emailExistente = this.repository.buscarPorEmail(dto.email);
    if (emailExistente) {
      throw new AppError(400, `Ya existe un alumno registrado con el email ${dto.email}`);
    }

    const nuevoAlumno: Alumno = {
      id: 0, // this.repository.siguienteId(),
      nombre: dto.nombre.trim(),
      email: dto.email.trim().toLowerCase(),
      activo: true, // Regla: todo alumno nuevo nace activo
      fechaInscripcion: new Date().toISOString()
    };

    return this.repository.guardar(nuevoAlumno);
  }

  obtenerTodos(): Alumno[] {
    return this.repository.obtenerTodos();
  }

  obtenerPorId(id: number): Alumno {
    const alumno = this.repository.buscarPorId(id);
    if (!alumno) {
      throw new AppError(404, `No se encontró un alumno con el ID ${id}`);
    }
    return alumno;
  }

  actualizar(id: number, dto: ActualizarAlumnoDto): Alumno {
    // Regla de negocio: Si están intentando cambiar el email...
    if (dto.email) {
      const emailExistente = this.repository.buscarPorEmail(dto.email);
      // Verificamos que el email no exista, o si existe, que sea del MISMO alumno
      if (emailExistente && emailExistente.id !== id) {
        throw new AppError(400, `El email ${dto.email} ya está registrado en otro alumno.`);
      }
    }

    const alumnoActualizado = this.repository.actualizar(id, dto);
    if (!alumnoActualizado) {
      throw new AppError(404, `No se encontró un alumno con el ID ${id}`);
    }
    return alumnoActualizado;
  }

  eliminar(id: number): void {
    const fueEliminado = this.repository.eliminar(id);
    if (!fueEliminado) {
      throw new AppError(404, `No se encontró un alumno con el ID ${id}`);
    }
  }
}