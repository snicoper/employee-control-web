import { TimeState } from '../entities/types/time-state.model';

/** Estado de TimeControl del empleado actual. */
export interface TimeControlStateResponse {
  start: Date;
  timeState: TimeState;
}
