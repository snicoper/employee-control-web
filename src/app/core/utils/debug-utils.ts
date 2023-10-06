import { AppEnvironments } from './app-environments';
import { replaceStringParams } from './common-utils';

/**
 * Muestra una lista de errores solo si se esta en desarrollo.
 *
 * @param errors Errores a mostrar.
 */
export const debugErrors = (...errors: string[]): void => {
  if (AppEnvironments.isDebug) {
    // eslint-disable-next-line
    errors.forEach((error) => console.log(`%c ERROR: ${error} `, 'background: #900C3F; color: white'));
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
 * Muestra un error solo si se esta en desarrollo.
 * Example: debugMessage('El valor de 2 + 2 es: {valor}', { valor: '4' }).
 *
 * @param url Una de las propiedades.
 * @param args Remplaza el {key} por el value de.
 */
export const debugMessage = (url: string, args: Record<string, string>): void => {
  if (AppEnvironments.isDebug) {
    const message = replaceStringParams(url, args);
    // eslint-disable-next-line
    debugMessages(message);
  }
};
