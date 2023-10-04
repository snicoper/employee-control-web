/** Respuesta de error de la API. */
export interface BadRequest {
  errors: { [key: string]: string[] };
  type: string;
  title: string;
  status: number;
}
