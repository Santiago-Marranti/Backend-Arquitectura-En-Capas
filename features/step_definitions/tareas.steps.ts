// features/step_definitions/tareas.steps.ts
import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "node:assert";
import { TareasService } from "../../src/tareas/tareas.service.js";

let fakeTareasDb: any[];
let repositoryMock: any;
let service: TareasService;
let ultimoResultado: any;

Before(() => {
  fakeTareasDb = [];

  repositoryMock = {
    siguienteId: () => fakeTareasDb.length + 1,
    guardar: (tarea: any) => {
      fakeTareasDb.push(tarea);
      return tarea;
    },
    obtenerTodas: () => fakeTareasDb,
    buscarPorId: (id: number) => fakeTareasDb.find((t) => t.id === id),
    actualizar: (id: number, datos: any) => {
      const tarea = fakeTareasDb.find((t) => t.id === id);
      if (!tarea) return null;
      Object.assign(tarea, datos);
      return tarea;
    },
    eliminar: (id: number) => {
      const index = fakeTareasDb.findIndex((t) => t.id === id);
      if (index === -1) return false;
      fakeTareasDb.splice(index, 1);
      return true;
    }
  };

  service = new TareasService(repositoryMock as any);
  ultimoResultado = null;
});

Given('que el repositorio de tareas está vacío', function () {
  fakeTareasDb = [];
});

When('intento crear una tarea con el título {string} y prioridad {string}', function ( titulo: string, prioridad: string) {
  ultimoResultado = service.crear({ titulo,
                                    prioridad});
});

Then('el registro de la tarea debe ser exitoso con prioridad {string} y completada en falso', function (prioridadEsperada: string) {
  assert.notStrictEqual(ultimoResultado, undefined);
  assert.strictEqual(ultimoResultado.titulo, "Estudiar BDD");
  assert.strictEqual(ultimoResultado.prioridad, prioridadEsperada);
  assert.strictEqual(ultimoResultado.completada, false);
});

Given('que existen tareas registradas en el sistema', function () {
  fakeTareasDb.push(
    { id: 1, titulo: "Tarea 1", prioridad: "alta", completada: false, fechaCreacion: new Date().toISOString() },
    { id: 2, titulo: "Tarea 2", prioridad: "baja", completada: true, fechaCreacion: new Date().toISOString() }
  );
});

When('solicito la lista de todas las tareas', function () {
  ultimoResultado = service.obtenerTodas();
});

Then('obtengo un listado con todas las tareas guardadas', function () {
  assert.strictEqual(Array.isArray(ultimoResultado), true);
  assert.strictEqual(ultimoResultado.length, 2);
});

Given('que existe una tarea registrada con ID {int} y título {string}', function (id: number, titulo: string) {
  fakeTareasDb.push({ id, titulo, prioridad: "media", completada: false, fechaCreacion: new Date().toISOString() });
});

When('intento actualizar la tarea con ID {int} marcándola como completada', function (id: number) {
  ultimoResultado = service.actualizar(id, { completada: true });
});

Then('la tarea con ID {int} debe figurar como completada', function (id: number) {
  const tarea = service.obtenerPorId(id);
  assert.strictEqual(tarea.completada, true);
});

Given('que existe una tarea registrada con ID {int} para eliminar', function (id: number) {
  fakeTareasDb.push({ id, titulo: "Borrar esto", prioridad: "baja", completada: false, fechaCreacion: new Date().toISOString() });
});

When('intento eliminar la tarea con ID {int}', function (id: number) {
  service.eliminar(id);
});

Then('la tarea ya no debe existir en el sistema', function () {
  assert.strictEqual(fakeTareasDb.length, 0);
});