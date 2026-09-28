import { Router } from "express";
import { TareasRepository } from "./tareas.repository.js";
import { TareasService } from "./tareas.service.js";
import { TareasController } from "./tareas.controller.js";

// 1. Instanciamos las dependencias (Inyección Manual)
const repository = new TareasRepository();
const service = new TareasService(repository);
const controller = new TareasController(service);

// 2. Creamos el Router de Express
export const tareasRouter = Router();

// 3. Mapeamos rutas con sus controladores
tareasRouter.get("/api/v1/tareas", controller.obtenerTodas);
tareasRouter.get("/api/v1/tareas/:id", controller.obtenerPorId);
tareasRouter.post("/api/v1/tareas", controller.crear);
tareasRouter.delete("/api/v1/tareas/:id", controller.eliminar);
tareasRouter.put("/api/v1/tareas/:id", controller.actualizar);