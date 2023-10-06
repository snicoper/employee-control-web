import { AppEnvironments } from './app-environments';

/**
 * Muestra una lista de errores solo si se esta en desarrollo.
 *
 * @param errors Errores a mostrar.
 */
export const debugErrors = (...errors: string[]): void => {
  if (AppEnvironments.isDebug) {
    // eslint-disable-next-line
    errors.forEach((error) => console.log(`%c Error: ${error} `, 'background: ##900C3F; color: white'));
  }
};

/**
 * Muestra una lista de errores solo si se esta en desarrollo.
 *
 * @param errors Errores a mostrar.
 */
export const debugMessages = (...errors: string[]): void => {
  if (AppEnvironments.isDebug) {
    // eslint-disable-next-line
    errors.forEach((error) => console.log(`%c DEBUG: ${error} `, 'background: #3B499E; color: white'));
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
