import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Refactorizado - API REST en Capas",
      version: "1.0.0",
      description: "Documentación oficial de la API con Express, TypeScript, Prisma y Arquitectura en Capas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desarrollo",
      },
    ],
    components: {
      schemas: {
        AlumnoInput: {
          type: "object",
          required: ["nombre", "email"],
          properties: {
            nombre: { type: "string", example: "Juan Pérez" },
            email: { type: "string", format: "email", example: "juan.perez@example.com" },
          },
        },
        AlumnoUpdateInput: {
          type: "object",
          properties: {
            nombre: { type: "string", example: "Juan Carlos Pérez" },
            email: { type: "string", format: "email", example: "juancarlos@example.com" },
          },
        },
        AlumnoResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "clh1234560000abc" },
            nombre: { type: "string", example: "Juan Pérez" },
            email: { type: "string", example: "juan.perez@example.com" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        TareaInput: {
          type: "object",
          required: ["titulo"],
          properties: {
            titulo: { type: "string", example: "Completar arquitectura en capas" },
            descripcion: { type: "string", example: "Implementar controladores, servicios y repositorios" },
            completada: { type: "boolean", example: false },
          },
        },
        TareaUpdateInput: {
          type: "object",
          properties: {
            titulo: { type: "string", example: "Revisar arquitectura en capas" },
            descripcion: { type: "string", example: "Pruebas unitarias completadas" },
            completada: { type: "boolean", example: true },
          },
        },
        TareaResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "clh9876540000xyz" },
            titulo: { type: "string", example: "Completar arquitectura en capas" },
            descripcion: { type: "string", example: "Implementar controladores, servicios y repositorios" },
            completada: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Recurso no encontrado o datos inválidos" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

swaggerSpec.paths = {
  // ==================== ALUMNOS ====================
  "/api/v1/alumnos": {
    get: {
      summary: "Obtener todos los alumnos",
      tags: ["Alumnos"],
      responses: {
        "200": {
          description: "Lista de alumnos obtenida correctamente",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/AlumnoResponse" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Crear un nuevo alumno",
      tags: ["Alumnos"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AlumnoInput" },
          },
        },
      },
      responses: {
        "201": {
          description: "Alumno creado exitosamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AlumnoResponse" },
            },
          },
        },
        "400": { description: "Datos inválidos o campos faltantes" },
        "422": { description: "Error de validación de negocio" },
      },
    },
  },
  "/api/v1/alumnos/{id}": {
    get: {
      summary: "Obtener un alumno por ID",
      tags: ["Alumnos"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID único del alumno",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "Alumno encontrado",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AlumnoResponse" },
            },
          },
        },
        "404": { description: "Alumno no encontrado" },
      },
    },
    patch: {
      summary: "Actualizar parcialmente un alumno",
      tags: ["Alumnos"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID único del alumno",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AlumnoUpdateInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "Alumno actualizado correctamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AlumnoResponse" },
            },
          },
        },
        "400": { description: "Datos inválidos" },
        "404": { description: "Alumno no encontrado" },
        "422": { description: "Error de validación" },
      },
    },
    delete: {
      summary: "Eliminar un alumno",
      tags: ["Alumnos"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID único del alumno",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": { description: "Alumno eliminado correctamente" },
        "404": { description: "Alumno no encontrado" },
      },
    },
  },

  // ==================== TAREAS ====================
  "/api/v1/tareas": {
    get: {
      summary: "Obtener todas las tareas",
      tags: ["Tareas"],
      responses: {
        "200": {
          description: "Lista de tareas obtenida correctamente",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/TareaResponse" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Crear una nueva tarea",
      tags: ["Tareas"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TareaInput" },
          },
        },
      },
      responses: {
        "201": {
          description: "Tarea creada exitosamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TareaResponse" },
            },
          },
        },
        "400": { description: "Datos inválidos" },
        "422": { description: "Error de validación" },
      },
    },
  },
  "/api/v1/tareas/{id}": {
    get: {
      summary: "Obtener una tarea por ID",
      tags: ["Tareas"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID único de la tarea",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": {
          description: "Tarea encontrada",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TareaResponse" },
            },
          },
        },
        "404": { description: "Tarea no encontrada" },
      },
    },
    put: {
      summary: "Actualizar una tarea existente",
      tags: ["Tareas"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID único de la tarea",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/TareaUpdateInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "Tarea actualizada correctamente",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TareaResponse" },
            },
          },
        },
        "400": { description: "Datos inválidos" },
        "404": { description: "Tarea no encontrada" },
        "422": { description: "Error de validación" },
      },
    },
    delete: {
      summary: "Eliminar una tarea",
      tags: ["Tareas"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID único de la tarea",
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": { description: "Tarea eliminada correctamente" },
        "404": { description: "Tarea no encontrada" },
      },
    },
  },
};

export { swaggerSpec };