export interface TimeControlRecordResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  start: string;
  finish: string;
  closedBy: number;
  timeState: number;
  deviceTypeStart: number;
  deviceTypeFinish: number;
  duration: number;
}
