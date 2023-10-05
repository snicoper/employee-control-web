import { BaseModel } from './base.model';

export interface BaseAuditableModel extends BaseModel {
  created: Date;
  createdBy?: string;
  lastModified: Date;
  lastModifiedBy?: string;
}
