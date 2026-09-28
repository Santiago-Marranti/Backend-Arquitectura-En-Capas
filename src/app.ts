import express from "express";
import { tareasRouter } from "./tareas/tareas.routes.js";
import { notFoundHandler } from "./middlewares/not-found.js";
import { errorHandler } from "./middlewares/err-handler.js";
import { alumnosRouter } from "./alumnos/alumnos.routes.js";

export const app = express();

// Middleware para transformar el body entrante a JSON
app.use(express.json());

// Montamos las rutas de tareas
app.use(tareasRouter);
app.use(alumnosRouter);

// Middlewares globales (se ejecutan al final si nada respondió antes)
app.use(notFoundHandler);
app.use(errorHandler);