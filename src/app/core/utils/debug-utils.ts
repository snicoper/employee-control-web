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
