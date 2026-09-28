# features/alumnos.feature
Feature: Gestión de Alumnos (CRUD)
  Como administrador del sistema
  Quiero administrar los registros de los alumnos
  Para mantener la base de datos actualizada

  Scenario: Registrar un nuevo alumno exitosamente
    Given que no existe un alumno registrado con el email "juan@test.com"
    When intento registrar un alumno con nombre "Juan" y email "juan@test.com"
    Then el registro del alumno debe ser exitoso y estar activo

  Scenario: Listar todos los alumnos
    Given que existen varios alumnos registrados
    When solicito la lista completa de alumnos
    Then obtengo todos los alumnos registrados

  Scenario: Actualizar un alumno existente
    Given que existe un alumno registrado con ID 1 y nombre "Carlos"
    When intento actualizar el nombre del alumno con ID 1 a "Carlos Alberto"
    Then el nombre del alumno con ID 1 debe ser "Carlos Alberto"

  Scenario: Eliminar un alumno
    Given que existe un alumno registrado con ID 1 para dar de baja
    When intento eliminar al alumno con ID 1
    Then el alumno ya no debe figurar en el sistema de alumnos