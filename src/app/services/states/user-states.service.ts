import { Injectable, inject } from '@angular/core';
import { CompanyEmployeeStateService } from './company-employee-state.service';
import { CompanySettingsStateService } from './company-settings-state.service';
import { EmployeeSettingsStateService } from './employee-settings-state.service';
import { TimeControlIncidencesCountStateService } from './time-control-incidences-count-state.service';
import { TimeControlStateService } from './time-control-state.service';

/** Maneja estados de un usuario al hacer login o logout. */
@Injectable({ providedIn: 'root' })
export class UserStatesService {
  private readonly companyEmployeeStateService = inject(CompanyEmployeeStateService);
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly timeControlStateService = inject(TimeControlStateService);
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  /** Carga estados del usuario. */
  load(): void {
    this.companyEmployeeStateService.refresh();
    this.companySettingsStateService.refresh();
    this.timeControlStateService.refresh();
    this.employeeSettingsStateService.refresh();
    this.timeControlIncidencesCountStateService.refresh();
  }

  /** Elimina estados del usuario. */
  clean(): void {
    this.companyEmployeeStateService.clean();
    this.companySettingsStateService.clean();
    this.timeControlStateService.clean();
    this.employeeSettingsStateService.clean();
    this.timeControlIncidencesCountStateService.clean();
  }
}
