import express from "express";
import { tareasRouter } from "./tareas/tareas.routes.js";
import { notFoundHandler } from "./middlewares/not-found.js";
import { errorHandler } from "./middlewares/err-handler.js";
export const app = express();
// Middleware para transformar el body entrante a JSON
app.use(express.json());
// Montamos las rutas de tareas
app.use(tareasRouter);
// Middlewares globales (se ejecutan al final si nada respondió antes)
app.use(notFoundHandler);
app.use(errorHandler);
