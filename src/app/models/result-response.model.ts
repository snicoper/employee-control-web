import { BadRequestErrors } from './bad-request-errors';

export interface ResultResponse {
  succeeded: boolean;
  status: number;
  errors: BadRequestErrors;
  title?: string;
  type?: string;
}

export interface ResultValueResponse<TValue> extends ResultResponse {
  value: TValue;
}
