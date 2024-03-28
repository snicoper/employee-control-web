import { DeviceType } from '../../../models/entities/types/device-type.model';

export interface TimeControlRecordCreateRequest {
  userId: string;
  start: string;
  finish: string;
  deviceType: DeviceType;
}
