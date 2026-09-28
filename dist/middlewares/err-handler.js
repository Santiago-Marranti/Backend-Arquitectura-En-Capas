import { AppError } from "../errors/app-error.js";
export const errorHandler = (err, _req, res, _next) => {
    // Si es un error controlado por nuestra app (AppError)
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message
        });
        return;
    }
    // Si fue un error inesperado de código/servidor
    console.error(err);
    res.status(500).json({
        error: "Error interno del servidor"
    });
};
