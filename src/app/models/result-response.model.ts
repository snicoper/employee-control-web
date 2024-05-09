export interface ResultResponse {
  succeeded: boolean;
  errors: { name: string; details: string[] };
}
