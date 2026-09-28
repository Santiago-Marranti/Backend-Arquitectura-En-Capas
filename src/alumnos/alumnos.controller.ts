import { Request, Response, NextFunction } from "express";
import { AlumnosService } from "./alumnos.service.js";
import { AppError } from "../errors/app-error.js";

export class AlumnosController {
  constructor(private readonly service: AlumnosService) { }

  crear = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const body = req.body || {};
      const { nombre, email } = body;

      // Validación HTTP (Forma y tipos)
      if (typeof nombre !== "string" || nombre.trim() === "") {
        throw new AppError(400, "El campo 'nombre' es obligatorio y debe ser texto.");
      }

      if (typeof email !== "string" || !email.includes("@")) {
        throw new AppError(400, "El campo 'email' es obligatorio y debe tener un formato válido.");
      }

      const nuevoAlumno = this.service.crear({ nombre, email });
      res.status(201).json(nuevoAlumno);
    } catch (error) {
      next(error);
    }
  };

  obtenerTodos = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const alumnos = this.service.obtenerTodos();
      res.status(200).json(alumnos);
    } catch (error) {
      next(error);
    }
  };

  obtenerPorId = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new AppError(400, "El ID debe ser numérico.");

      const alumno = this.service.obtenerPorId(id);
      res.status(200).json(alumno);
    } catch (error) {
      next(error);
    }
  };

  actualizar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new AppError(400, "El ID debe ser numérico.");

      const body = req.body || {};
      const { nombre, email, activo } = body;

      // Validaciones básicas de tipos HTTP
      if (nombre !== undefined && (typeof nombre !== "string" || nombre.trim() === "")) {
        throw new AppError(400, "El campo 'nombre' debe ser un texto válido.");
      }
      if (email !== undefined && (typeof email !== "string" || !email.includes("@"))) {
        throw new AppError(400, "El campo 'email' debe tener un formato válido.");
      }
      if (activo !== undefined && typeof activo !== "boolean") {
        throw new AppError(400, "El campo 'activo' debe ser true o false.");
      }

      const alumnoActualizado = this.service.actualizar(id, { nombre, email, activo });
      res.status(200).json(alumnoActualizado);
    } catch (error) {
      next(error);
    }
  };

  eliminar = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new AppError(400, "El ID debe ser numérico.");

      this.service.eliminar(id);
      res.status(200).json({"mensaje": "Alumno eliminado con exito!"}); // 204 No Content: Éxito, sin body de respuesta
    } catch (error) {
      next(error);
    }
  };
}