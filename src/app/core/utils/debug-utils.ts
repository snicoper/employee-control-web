import { AppEnvironments } from './app-environments';

const logSettings = {
  error: { key: 'ERROR', color: '#cc0066' },
  warning: { key: 'WARNING', color: '#cc7a00' },
  info: { key: 'INFO', color: '#cc0066' },
  success: { key: 'SUCCESS', color: '#009933' }
};

const displayLogMessage = (message: string, settings: { key: string; color: string }): void => {
  if (AppEnvironments.isDebug) {
    const background = `background: ${settings.color}; color: white`;
    // eslint-disable-next-line
    console.log(`%c ${settings.key}: ${message} `, background);
  }
};

/**
 * Muestra message de tipo error solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logError = (message: string): void => {
  displayLogMessage(message, logSettings.error);
};

/**
 * Muestra message de tipo warning solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logWarning = (message: string): void => {
  displayLogMessage(message, logSettings.warning);
};

/**
 * Muestra message de tipo info solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logInfo = (message: string): void => {
  displayLogMessage(message, logSettings.info);
};

/**
 * Muestra message de tipo success solo si se esta en desarrollo.
 *
 * @param message Error a mostrar.
 */
export const logSuccess = (message: string): void => {
  displayLogMessage(message, logSettings.success);
};
