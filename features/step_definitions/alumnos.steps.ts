// features/step_definitions/alumnos.steps.ts
import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "node:assert";
import { AlumnosService } from "../../src/alumnos/alumnos.service.js";

let fakeAlumnosDb: any[];
let repositoryMock: any;
let service: AlumnosService;
let ultimoResultado: any;

Before(() => {
  fakeAlumnosDb = [];

  repositoryMock = {
    buscarByEmail: (email: string) => fakeAlumnosDb.find((a) => a.email === email),
    buscarPorEmail: (email: string) => fakeAlumnosDb.find((a) => a.email === email),
    siguienteId: () => fakeAlumnosDb.length + 1,
    guardar: (alumno: any) => {
      const nuevo = { ...alumno, id: fakeAlumnosDb.length + 1 };
      fakeAlumnosDb.push(nuevo);
      return nuevo;
    },
    obtenerTodos: () => fakeAlumnosDb,
    buscarPorId: (id: number) => fakeAlumnosDb.find((a) => a.id === id),
    actualizar: (id: number, datos: any) => {
      const alumno = fakeAlumnosDb.find((a) => a.id === id);
      if (!alumno) return null;
      Object.assign(alumno, datos);
      return alumno;
    },
    eliminar: (id: number) => {
      const index = fakeAlumnosDb.findIndex((a) => a.id === id);
      if (index === -1) return false;
      fakeAlumnosDb.splice(index, 1);
      return true;
    }
  };

  service = new AlumnosService(repositoryMock as any);
  ultimoResultado = null;
});

Given('que no existe un alumno registrado con el email {string}', function (email: string) {
  // El array inicia vacío
});

When('intento registrar un alumno con nombre {string} y email {string}', function (nombre: string, email: string) {
  ultimoResultado = service.crear({ nombre, email });
});

Then('el registro del alumno debe ser exitoso y estar activo', function () {
  assert.notStrictEqual(ultimoResultado, undefined);
  assert.strictEqual(ultimoResultado.activo, true);
});

Given('que existen varios alumnos registrados', function () {
  fakeAlumnosDb.push(
    { id: 1, nombre: "Ana", email: "ana@test.com", activo: true, fechaInscripcion: "" },
    { id: 2, nombre: "Luis", email: "luis@test.com", activo: true, fechaInscripcion: "" }
  );
});

When('solicito la lista completa de alumnos', function () {
  ultimoResultado = service.obtenerTodos();
});

Then('obtengo todos los alumnos registrados', function () {
  assert.strictEqual(Array.isArray(ultimoResultado), true);
  assert.strictEqual(ultimoResultado.length, 2);
});

Given('que existe un alumno registrado con ID {int} y nombre {string}', function (id: number, nombre: string) {
  fakeAlumnosDb.push({ id, nombre, email: "carlos@test.com", activo: true, fechaInscripcion: "" });
});

When('intento actualizar el nombre del alumno con ID {int} a {string}', function (id: number, nuevoNombre: string) {
  service.actualizar(id, { nombre: nuevoNombre });
});

Then('el nombre del alumno con ID {int} debe ser {string}', function (id: number, nombreEsperado: string) {
  const alumno = service.obtenerPorId(id);
  assert.strictEqual(alumno.nombre, nombreEsperado);
});

Given('que existe un alumno registrado con ID {int} para dar de baja', function (id: number) {
  fakeAlumnosDb.push({ id, nombre: "A borrar", email: "borrar@test.com", activo: true, fechaInscripcion: "" });
});

When('intento eliminar al alumno con ID {int}', function (id: number) {
  service.eliminar(id);
});

Then('el alumno ya no debe figurar en el sistema de alumnos', function () {
  assert.strictEqual(fakeAlumnosDb.length, 0);
});