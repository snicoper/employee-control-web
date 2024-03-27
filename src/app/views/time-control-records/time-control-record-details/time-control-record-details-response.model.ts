import { ClosedBy, DeviceType, TimeState } from '../../../models/entities/types/_index';

export interface TimeControlRecordDetailsResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  incidence: boolean;
  incidenceDescription?: string;
  start: Date;
  finish: Date;
  closedBy: ClosedBy;
  timeState: TimeState;
  deviceTypeStart: DeviceType;
  deviceTypeFinish: DeviceType;
  latitudeStart?: number;
  longitudeStart?: number;
  latitudeFinish?: number;
  longitudeFinish?: number;
  duration: number;
}
