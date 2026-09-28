# features/tareas.feature
Feature: Gestión de Tareas (CRUD)
  Como usuario del sistema
  Quiero crear, listar, actualizar y eliminar tareas
  Para organizar mis pendientes correctamente

  Scenario: Crear una tarea exitosamente
    Given que el repositorio de tareas está vacío
    When intento crear una tarea con el título "Estudiar BDD" y prioridad "media"
    Then el registro de la tarea debe ser exitoso con prioridad "media" y completada en falso

  Scenario: Listar todas las tareas
    Given que existen tareas registradas en el sistema
    When solicito la lista de todas las tareas
    Then obtengo un listado con todas las tareas guardadas

  Scenario: Actualizar el estado de una tarea
    Given que existe una tarea registrada con ID 1 y título "Comprar pan"
    When intento actualizar la tarea con ID 1 marcándola como completada
    Then la tarea con ID 1 debe figurar como completada

  Scenario: Eliminar una tarea existente
    Given que existe una tarea registrada con ID 1 para eliminar
    When intento eliminar la tarea con ID 1
    Then la tarea ya no debe existir en el sistema