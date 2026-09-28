import { Request, Response, NextFunction } from "express";
import { TareasService } from "./tareas.service.js";
import { AppError } from "../errors/app-error.js";

export class TareasController {
  // Inyectamos el servicio por constructor
  constructor(private readonly service: TareasService) {}

  obtenerTodas = (_req: Request, res: Response, next: NextFunction): void => {
    try {
      const tareas = this.service.obtenerTodas();
      res.status(200).json(tareas);
    } catch (error) {
      next(error);
    }
  };

  obtenerPorId = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      const tarea = this.service.obtenerPorId(id);
      res.status(200).json(tarea);
    } catch (error) {
      next(error);
    }
  };

  crear = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { titulo, prioridad } = req.body || {};
      
      if(!titulo || typeof titulo !== "string" || titulo.trim() === ""){
        throw new AppError(400, "El título de la tarea es obligatorio y debe ser en formato texto.");
      }

      const nuevaTarea = this.service.crear({ titulo, prioridad });
      res.status(201).json(nuevaTarea);
    } catch (error) {
      next(error);
    }
  };

  eliminar = (req: Request, res: Response, next: NextFunction): void => {
    try{
      const id = Number(req.params.id) || -1;

      if(!id || id < 1){
        throw new AppError(400, "El ID es de tipo numerico y obligatorio.");
      }

      const status = this.service.eliminar(id - 1);

      if(status){
        res.status(200).json({estado: "Eliminado correctamente!"});
      } else {
        res.status(500).json({estado: "No se ha podido eliminar debido a un error interno del servidor."})
      }
    } catch (error) {
      next(error);
    }
  };

  actualizar = (req: Request, res: Response, next: NextFunction): void => {
    try{
      const id = Number(req.params.id);

      if(isNaN(id)){
        throw new AppError(400, "El ID proporcionado debe ser un numero valido.");
      }

      const body = req.body || {};
      const { titulo, prioridad, completada } = body;

      // Validación básica de tipos (similar a lo que charlamos antes)
      if (titulo !== undefined && (typeof titulo !== "string" || titulo.trim() === "")) {
        throw new AppError(400, "El campo 'titulo' debe ser un texto válido.");
      }

      if (completada !== undefined && typeof completada !== "boolean") {
        throw new AppError(400, "El campo 'completada' debe ser un booleano (true/false).");
      }

      const tareaModificada = this.service.actualizar(id, { titulo, prioridad, completada });

      res.status(200).json(tareaModificada);
    } catch(error) {
      next(error);
    }
  }; 

}