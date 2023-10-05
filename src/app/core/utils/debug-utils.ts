import { AppEnvironments } from './app-environments';

/**
 * Muestra una lista de errores solo si se esta en desarrollo.
 *
 * @param errors Errores a mostrar.
 */
export const debugErrors = (...errors: string[]): void => {
  if (AppEnvironments.isDebug) {
    // eslint-disable-next-line
    errors.forEach((error) => console.log(`%c Error message: ${error} `, 'background: #B0280B; color: white'));
  }
};

/**
 * Muestra una lista de errores solo si se esta en desarrollo.
 *
 * @param errors Errores a mostrar.
 */
export const debugMessage = (...errors: string[]): void => {
  if (AppEnvironments.isDebug) {
    // eslint-disable-next-line
    errors.forEach((error) => console.log(`%c Debug message: ${error} `, 'background: #EBD63F; color: black'));
  }
};

/**
 * Lanza un Error y para la ejecución de la aplicación..
 *
 * Mostrara el error solo si se esta en desarrollo, en caso contrario
 * solo mostrara un error genérico.
 *
 * @param message Mensaje a mostrar.
 */
export const raiseError = (message: string): void => {
  if (AppEnvironments.isDebug) {
    throw new Error(message);
  } else {
    throw new Error('Ha ocurrido un error en la aplicación.');
  }
};
