import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ValidationErrors } from '@core/types/_index';
import { ToastrService } from 'ngx-toastr';

/** Crea un Guid. */
export const createGuid = (): string => {
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const ucFirst = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Utiliza una de las propiedades de urls para remplazar {algo} por valor en los args.
 *
 * @param url Una de las propiedades.
 * @param args Remplaza el {key} por el value de.
 */
export const replaceStringParams = (url: string, args: Record<string, string>): string => {
  const keys = Object.keys(args);
  const values = Object.values(args);

  for (let i = 0; i < keys.length; i += 1) {
    const key = '{' + keys[i] + '}';
    const value = values[i];
    url = url.replace(key, value);
  }

  return url;
};

/**
 * Comprueba si ha habido errores en la respuesta http y en caso de haberlos,
 * mostrara los errores en un toast.
 * Solo mostrara los 400 con nonFieldErrors.
 *
 * @param errors Errores obtenidos de una consulta a la API.
 * @param toastrService Servicio para mostrar los errores.
 */
export const toastForNonFieldErrors = (errors: HttpErrorResponse, toastrService: ToastrService): void => {
  if (errors.status === HttpStatusCode.BadRequest && ValidationErrors.nonFieldErrors in errors.error.errors) {
    errors.error.errors.nonFieldErrors.forEach((error: string) => {
      toastrService.error(error);
    });
  }
};

/**
 * Comprueba si ha habido errores en la respuesta http y * en caso de haberlos,
 * mostrara los errores en un toast.
 * Solo mostrara los 400 con notificationErrors.
 *
 * @param errors Errores obtenidos de una consulta a la API.
 * @param toastrService Servicio para mostrar los errores.
 */
export const toastForNotificationErrors = (errors: HttpErrorResponse, toastrService: ToastrService): void => {
  if (errors.status === HttpStatusCode.BadRequest && ValidationErrors.notificationErrors in errors.error.errors) {
    errors.error.errors.notificationErrors.forEach((error: string) => {
      toastrService.error(error);
    });
  }
};
