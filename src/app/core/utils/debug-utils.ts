import { AppEnvironments } from './app-environments';

/**
 * Muestra message de tipo error solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logError = (message: string): void => {
  displayLogMessage('ERROR', message, '#cc0066');
};

/**
 * Muestra message de tipo warning solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logWarning = (message: string): void => {
  displayLogMessage('WARNING', message, '#cc7a00');
};

/**
 * Muestra message de tipo info solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logInfo = (message: string): void => {
  displayLogMessage('INFO', message, '#3366ff');
};

/**
 * Muestra message de tipo success solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logSuccess = (message: string): void => {
  displayLogMessage('SUCCESS', message, '#009933');
};

const displayLogMessage = (type: string, message: string, color: string): void => {
  if (AppEnvironments.isDebug) {
    const background = `background: ${color}; color: white`;
    // eslint-disable-next-line
    console.log(`%c ${type}: ${message} `, background);
  }
};
