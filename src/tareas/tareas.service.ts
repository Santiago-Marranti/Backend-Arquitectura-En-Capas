import { TareasRepository } from "./tareas.repository.js";
import { Tarea, CrearTareaDto, ActualizarTareaDto } from "./tarea.js";
import { AppError } from "../errors/app-error.js";

export class TareasService {
  // Recibimos la instancia del repositorio mediante inyección de dependencias
  constructor(private readonly repository: TareasRepository) {}

  // Regla 1: Validar datos, asignar ID y valores por defecto, y guardar
  crear(dto: CrearTareaDto): Tarea {

    const nuevaTarea: Tarea = {
      id: 0, //this.repository.siguienteId(),
      titulo: dto.titulo.trim(),
      prioridad: dto.prioridad || "media", // Regla: prioridad por defecto 'media'
      completada: false,                    // Regla: toda tarea nace no completada
      fechaCreacion: new Date().toISOString()
    };

    console.log(`Tarea ${dto.titulo} con prioridad ${dto.prioridad}`);

    return this.repository.guardar(nuevaTarea);
  }

  // Regla 2: Obtener la lista completa
  obtenerTodas(): Tarea[] {
    return this.repository.obtenerTodas();
  }

  // Regla 3: Validar existencia de la tarea
  obtenerPorId(id: number): Tarea {
    const tarea = this.repository.buscarPorId(id);
    
    if (!tarea) {
      // Si la regla de negocio falla, lanzamos nuestro error personalizado (404)
      throw new AppError(404, `No se encontró la tarea con el ID ${id}`);
    }

    return tarea;
  }

  eliminar(id: number): Boolean {

    const tarea = this.repository.buscarPorId(id);

    if(!tarea){
      throw new AppError(404, `No se encontró la tarea con el ID ${id}`);
    }

    const status = this.repository.eliminar(id);

    return status;
  }

  actualizar(id: number, dto: ActualizarTareaDto): Tarea {
    // Se podría validar reglas de negocio acá, por ejemplo:
    // Si intenta cambiar el título, verificar que no exista otro igual, etc.

    const tareaActualizada = this.repository.actualizar(id, dto);

    if(!tareaActualizada){
      throw new AppError(404, `No se encontro la tarea con el ID ${id}`);
    }

    return tareaActualizada;
  }
}