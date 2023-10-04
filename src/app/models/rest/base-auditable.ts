import { BaseModel } from './base-model';

export interface BaseAuditable extends BaseModel {
  created: Date;
  createdBy?: string;
  lastModified: Date;
  lastModifiedBy?: string;
}
