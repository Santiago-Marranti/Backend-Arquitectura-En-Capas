// src/db/database.ts
import Database from "better-sqlite3";

// Esto crea un archivo llamado "database.sqlite" en la raíz de tu proyecto
const db = new Database("database.sqlite");

// Inicializamos las tablas con SQL plano
db.exec(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    prioridad TEXT NOT NULL,
    completada BOOLEAN NOT NULL,
    fechaCreacion TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS alumnos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    activo BOOLEAN NOT NULL,
    fechaInscripcion TEXT NOT NULL
  );
`);

export { db };