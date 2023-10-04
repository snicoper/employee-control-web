/**
 * Constantes de formulario globales.
 * Convenciones con el backend de los errores de validación.
 */
export enum ValidationErrors {
  /** Errores de pagina, redirecciona a pagina de errores. */
  pageError = 'PageError',

  /** Errores del formulario. */
  nonFieldErrors = 'NonFieldErrors',

  /** Errores de notificación, abrirá un toast. */
  notificationErrors = 'NotificationErrors'
}
