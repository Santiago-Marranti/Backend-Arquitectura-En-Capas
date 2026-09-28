import { AppError } from "../errors/app-error.js";
export class TareasService {
    repository;
    // Recibimos la instancia del repositorio mediante inyección de dependencias
    constructor(repository) {
        this.repository = repository;
    }
    // Regla 1: Validar datos, asignar ID y valores por defecto, y guardar
    crear(dto) {
        if (!dto.titulo || dto.titulo.trim() === "") {
            throw new AppError(400, "El título de la tarea es obligatorio");
        }
        const nuevaTarea = {
            id: this.repository.siguienteId(),
            titulo: dto.titulo.trim(),
            prioridad: dto.prioridad || "media", // Regla: prioridad por defecto 'media'
            completada: false, // Regla: toda tarea nace no completada
            fechaCreacion: new Date().toISOString()
        };
        return this.repository.guardar(nuevaTarea);
    }
    // Regla 2: Obtener la lista completa
    obtenerTodas() {
        return this.repository.obtenerTodas();
    }
    // Regla 3: Validar existencia de la tarea
    obtenerPorId(id) {
        const tarea = this.repository.buscarPorId(id);
        if (!tarea) {
            // Si la regla de negocio falla, lanzamos nuestro error personalizado (404)
            throw new AppError(404, `No se encontró la tarea con el ID ${id}`);
        }
        return tarea;
    }
}
