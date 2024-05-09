import { ResultResponse } from './result-response.model';

export interface ResultValueResponse<TData> extends ResultResponse {
  data: TData;
}
