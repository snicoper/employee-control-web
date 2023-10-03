/** Respuesta de error de la API. */
export interface BadRequest {
  // TODO: Revisar errors[] si es el tipo correcto.
  errors: string[];
  type: string;
  title: string;
  status: number;
}
