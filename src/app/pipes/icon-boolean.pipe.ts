import { Pipe, PipeTransform } from '@angular/core';

/**
 * Devuelve un icon en función del valor booleano.
 * Para tipos booleans, retorna el HTML con un icono según el valor.
 *
 * @example:
 *  <td [innerHTML]="employee.is_staff | iconBoolean"></td>
 */
@Pipe({ name: 'iconBoolean' })
export class IconBooleanPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) {
      return '<span class="icon fas fa-check text-success"></span>';
    }

    return '<span class="icon fas fa-times text-danger"></span>';
  }
}
