import { ClosedBy, TimeState } from '@aw/models/entities/types/_index';

export interface TimeControlGroupResponse {
  day: number;
  dayTitle: string;
  totalMinutes: number;
  times: TimeResponse[];
}

export interface TimeResponse {
  id: string;
  start: Date;
  finish: Date;
  timeState: TimeState;
  closedBy: ClosedBy;
  minutes: number;
  dayPercent: number;
}

export interface CurrentTimeControlResponse {
  start: Date;
  timeState: TimeState;
}
