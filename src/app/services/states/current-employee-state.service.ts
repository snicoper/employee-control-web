import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrl } from '../../core/urls/api-urls';
import { User } from '../../models/entities/user.model';
import { HttpClientApiService } from '../api/http-client-api.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class CurrentEmployeeStateService implements StateService<User | null> {
  private readonly httpClientApiService = inject(HttpClientApiService);

  private readonly currentEmployee$ = signal<User | null>(null);
  private readonly loadingCurrentEmployee$ = signal(false);

  readonly currentEmployee = computed(() => this.currentEmployee$());
  readonly loadingCurrentEmployee = computed(() => this.loadingCurrentEmployee$());

  refresh(): void {
    this.loadCurrentEmployee();
  }

  clean(): void {
    this.currentEmployee$.set(null);
  }

  get(): User | null {
    return this.currentEmployee$();
  }

  private loadCurrentEmployee(): void {
    this.loadingCurrentEmployee$.set(true);

    this.httpClientApiService
      .get<User>(ApiUrl.employees.getCurrentEmployee)
      .pipe(finalize(() => this.loadingCurrentEmployee$.set(false)))
      .subscribe({
        next: (result: User) => {
          this.currentEmployee$.set(result);
        }
      });
  }
}
