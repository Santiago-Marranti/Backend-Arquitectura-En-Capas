// src/tareas/tareas.repository.ts
import { db } from "../db/database.js";
import { Tarea } from "./tarea.js";

export class TareasRepository {
  obtenerTodas(): Tarea[] {
    const stmt = db.prepare("SELECT * FROM tareas");
    const rows = stmt.all() as any[];
    
    // SQLite guarda booleanos como 1 o 0, los reconvertimos a boolean
    return rows.map((row) => ({
      ...row,
      completada: Boolean(row.completada),
    }));
  }

  buscarPorId(id: number): Tarea | undefined {
    const stmt = db.prepare("SELECT * FROM tareas WHERE id = ?");
    const row = stmt.get(id) as any;
    
    if (!row) return undefined;

    return {
      ...row,
      completada: Boolean(row.completada),
    };
  }

  guardar(tarea: Tarea): Tarea {
    const stmt = db.prepare(`
      INSERT INTO tareas (titulo, prioridad, completada, fechaCreacion)
      VALUES (?, ?, ?, ?)
    `);

    const info = stmt.run(
      tarea.titulo,
      tarea.prioridad,
      tarea.completada ? 1 : 0,
      tarea.fechaCreacion
    );

    // Asignamos el ID autogenerado por SQLite
    return {
      ...tarea,
      id: Number(info.lastInsertRowid),
    };
  }

  actualizar(id: number, datosParciales: Partial<Tarea>): Tarea | null {
    const tareaActual = this.buscarPorId(id);
    if (!tareaActual) return null;

    const tareaFusionada = { ...tareaActual, ...datosParciales };

    const stmt = db.prepare(`
      UPDATE tareas 
      SET titulo = ?, prioridad = ?, completada = ?
      WHERE id = ?
    `);

    stmt.run(
      tareaFusionada.titulo,
      tareaFusionada.prioridad,
      tareaFusionada.completada ? 1 : 0,
      id
    );

    return this.buscarPorId(id) || null;
  }

  eliminar(id: number): boolean {
    const stmt = db.prepare("DELETE FROM tareas WHERE id = ?");
    const info = stmt.run(id);
    return info.changes > 0;
  }
}