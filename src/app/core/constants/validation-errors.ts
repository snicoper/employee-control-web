/**
 * Constantes de formulario globales.
 * Convenciones con el backend de los errores de validación.
 */
export abstract class ValidationErrors {
  /** Errores de pagina, redirecciona a pagina de errores. */
  static readonly pageError = 'pageError';

  /** Errores del formulario. */
  static readonly nonFieldErrors = 'nonFieldErrors';

  /** Errores de notificación, abrirá un toast. */
  static readonly notificationErrors = 'notificationErrors';
}
