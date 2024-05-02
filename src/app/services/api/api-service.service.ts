import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

/** Genérico para HttpClient. */
@Injectable({ providedIn: 'root' })
export class ApiService extends BaseApiService {}
