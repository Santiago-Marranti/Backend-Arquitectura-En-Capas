// src/alumnos/alumnos.repository.ts
import { db } from "../db/database.js";
import { Alumno } from "./alumno.js";

export class AlumnosRepository {
  obtenerTodos(): Alumno[] {
    const stmt = db.prepare("SELECT * FROM alumnos");
    const rows = stmt.all() as any[];

    return rows.map((row) => ({
      ...row,
      activo: Boolean(row.activo),
    }));
  }

  buscarPorId(id: number): Alumno | undefined {
    const stmt = db.prepare("SELECT * FROM alumnos WHERE id = ?");
    const row = stmt.get(id) as any;

    if (!row) return undefined;

    return {
      ...row,
      activo: Boolean(row.activo),
    };
  }

  buscarPorEmail(email: string): Alumno | undefined {
    const stmt = db.prepare("SELECT * FROM alumnos WHERE email = ?");
    const row = stmt.get(email) as any;

    if (!row) return undefined;

    return {
      ...row,
      activo: Boolean(row.activo),
    };
  }

  guardar(alumno: Alumno): Alumno {
    const stmt = db.prepare(`
      INSERT INTO alumnos (nombre, email, activo, fechaInscripcion)
      VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(
      alumno.nombre,
      alumno.email,
      alumno.activo ? 1 : 0,
      alumno.fechaInscripcion
    );

    return {
      ...alumno,
      id: Number(info.lastInsertRowid),
    };
  }

  actualizar(id: number, datosParciales: Partial<Alumno>): Alumno | null {
    const alumnoActual = this.buscarPorId(id);
    if (!alumnoActual) return null;

    const fusionado = { ...alumnoActual, ...datosParciales };

    const stmt = db.prepare(`
      UPDATE alumnos 
      SET nombre = ?, email = ?, activo = ?
      WHERE id = ?
    `);

    stmt.run(
      fusionado.nombre,
      fusionado.email,
      fusionado.activo ? 1 : 0,
      id
    );

    return this.buscarPorId(id) || null;
  }

  eliminar(id: number): boolean {
    const stmt = db.prepare("DELETE FROM alumnos WHERE id = ?");
    const info = stmt.run(id);
    return info.changes > 0;
  }
}