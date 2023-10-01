/**
 * Constantes de formulario globales.
 * Convenciones con el backend de los errores de validación.
 */
export enum ValidationErrors {
  /** Errores de pagina, redirecciona a pagina de errores. */
  pageError = 'pageError',

  /** Errores del formulario. */
  nonFieldErrors = 'nonFieldErrors',

  /** Errores de notificación, abrirá un toast. */
  notificationErrors = 'notificationErrors'
}
