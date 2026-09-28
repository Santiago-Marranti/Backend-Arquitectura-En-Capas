import { Router } from "express";
import { AlumnosRepository } from "./alumnos.repository.js";
import { AlumnosService } from "./alumnos.service.js";
import { AlumnosController } from "./alumnos.controller.js";

export const alumnosRouter = Router();

// Inyección de dependencias manual
const repository = new AlumnosRepository();
const service = new AlumnosService(repository);
const controller = new AlumnosController(service);

alumnosRouter.post("/api/v1/alumnos", controller.crear);
alumnosRouter.get("/api/v1/alumnos", controller.obtenerTodos);
alumnosRouter.get("/api/v1/alumnos/:id", controller.obtenerPorId);
alumnosRouter.patch("/api/v1/alumnos/:id", controller.actualizar); // PATCH para actualización parcial
alumnosRouter.delete("/api/v1/alumnos/:id", controller.eliminar);