import express from "express";
import { tareasRouter } from "./tareas/tareas.routes.js";
import { notFoundHandler } from "./middlewares/not-found.js";
import { errorHandler } from "./middlewares/err-handler.js";
import { alumnosRouter } from "./alumnos/alumnos.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

export const app = express();

// Middleware para transformar el body entrante a JSON
app.use(express.json());

// Montamos las rutas de tareas
app.use(tareasRouter);
app.use(alumnosRouter);

// 1. Tus rutas y Swagger van PRIMERO
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(alumnosRouter);
app.use(tareasRouter);

// Middlewares globales (se ejecutan al final si nada respondió antes)
app.use(notFoundHandler);
app.use(errorHandler);

// Ruta para la documentación interactiva de Swagger UI
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));