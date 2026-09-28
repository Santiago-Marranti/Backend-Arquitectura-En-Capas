// suma.test.js
import { describe, it, expect } from 'vitest';
import { suma } from '../src/suma.js';

describe('Función suma', () => {
  describe('Casos exitosos', () => {
    it('debe retornar 5 al sumar 2 y 3', () => {
      expect(suma(2, 3)).toBe(5);
    });

    it('debe manejar números negativos correctamente', () => {
      expect(suma(-1, -4)).toBe(-5);
    });

    it('debe trabajar con números decimales', () => {
      expect(suma(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('Casos límite y validación de errores', () => {
    it('debe lanzar un error si se pasa un string en lugar de un número', () => {
      expect(() => suma('2', 3)).toThrow('Ambos argumentos deben ser números');
    });

    it('debe lanzar un error si falta uno o ambos argumentos', () => {
      expect(() => suma(5)).toThrow('Ambos argumentos deben ser números');
      expect(() => suma()).toThrow('Ambos argumentos deben ser números');
    });

    it('debe lanzar un error si se pasa null o NaN', () => {
      expect(() => suma(null, 5)).toThrow('Ambos argumentos deben ser números');
      expect(() => suma(NaN, 5)).toThrow('Ambos argumentos deben ser números');
    });
  });
});