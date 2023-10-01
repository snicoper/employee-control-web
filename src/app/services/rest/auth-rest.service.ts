import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRestBaseService } from './api-rest-base.service';

@Injectable({ providedIn: 'root' })
export class AuthRestService extends ApiRestBaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }
}
