import { appEnvironments } from '../config/_index';

/** Errores que solo se mostraran en desarrollo. */

/**
 * Muestra una lista de errores solo si se esta en desarrollo.
 *
 * @param errors Errores a mostrar.
 */
export const debugErrors = (...errors: string[]): void => {
  if (appEnvironments.isDebug === true) {
    errors.forEach((error) => console.error(error));
  }
};

/**
 * Lanza un Error.
 * Mostrara el error solo si se esta en desarrollo, en caso contrario
 * solo mostrara un error genérico.
 *
 * @param message Mensaje a mostrar.
 */
export const raiseError = (message: string): void => {
  if (appEnvironments.isDebug === true) {
    throw new Error(message);
  } else {
    throw new Error('Ha ocurrido un error en la aplicación');
  }
};

/**
 * Pinta un console.log() solo si isDebug es true.
 *
 * @param message Mensaje de log a mostrar.
 */
export const consoleLog = (message: string, key = ''): void => {
  key = key === '' ? '' : `DEV - ${key}: `;

  if (appEnvironments.isDebug === true) {
    console.log(key, message);
  }
};
