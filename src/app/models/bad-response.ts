import { BadResponseErrors } from './bad-response-errors';

/** Respuesta de error de la API. */
export interface BadResponse {
  errors: BadResponseErrors;
  type: string;
  title: string;
  status: number;
}
