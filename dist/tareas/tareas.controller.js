export class TareasController {
    service;
    // Inyectamos el servicio por constructor
    constructor(service) {
        this.service = service;
    }
    obtenerTodas = (_req, res, next) => {
        try {
            const tareas = this.service.obtenerTodas();
            res.status(200).json(tareas);
        }
        catch (error) {
            next(error);
        }
    };
    obtenerPorId = (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const tarea = this.service.obtenerPorId(id);
            res.status(200).json(tarea);
        }
        catch (error) {
            next(error);
        }
    };
    crear = (req, res, next) => {
        try {
            const { titulo, prioridad } = req.body;
            const nuevaTarea = this.service.crear({ titulo, prioridad });
            res.status(201).json(nuevaTarea);
        }
        catch (error) {
            next(error);
        }
    };
}
