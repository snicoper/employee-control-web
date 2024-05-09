import { BadRequestErrors } from './bad-request-errors';

export interface Result {
  succeeded: boolean;
  status: number;
  errors: BadRequestErrors;
  title?: string;
  type?: string;
}

export interface ResultValue<TValue> extends Result {
  value: TValue;
}
