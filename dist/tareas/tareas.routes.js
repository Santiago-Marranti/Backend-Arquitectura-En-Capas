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
tareasRouter.get("/tareas", controller.obtenerTodas);
tareasRouter.get("/tareas/:id", controller.obtenerPorId);
tareasRouter.post("/tareas", controller.crear);
