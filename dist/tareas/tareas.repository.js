export class TareasRepository {
    // Simulación de la base de datos en memoria
    tareas = [];
    // Agrega una tarea al arreglo y la retorna
    guardar(tarea) {
        this.tareas.push(tarea);
        return tarea;
    }
    // Busca una tarea por ID o retorna undefined si no existe
    buscarPorId(id) {
        return this.tareas.find((tarea) => tarea.id === id);
    }
    // Retorna una copia del arreglo para evitar mutaciones externas accidentales
    obtenerTodas() {
        return [...this.tareas];
    }
    // Genera un ID autoincremental simple
    siguienteId() {
        return this.tareas.length + 1;
    }
}
