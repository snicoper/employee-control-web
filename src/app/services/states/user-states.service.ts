import { Injectable, inject } from '@angular/core';
import { CurrentCompanyEmployeeStateService } from './current-company-employee-state.service';
import { CurrentCompanySettingsStateService } from './current-company-settings-state.service';
import { CurrentTimeControlStateService } from './current-time-control-state.service';
import { EmployeeSettingsStateService } from './employee-settings-state.service';
import { TimeControlIncidencesCountStateService } from './time-control-incidences-count-state.service';

/** Maneja estados de un usuario al hacer login o logout. */
@Injectable({ providedIn: 'root' })
export class UserStatesService {
  private readonly currentCompanyEmployeeStateService = inject(CurrentCompanyEmployeeStateService);
  private readonly currentCompanySettingsStateService = inject(CurrentCompanySettingsStateService);
  private readonly currentTimeControlStateService = inject(CurrentTimeControlStateService);
  private readonly employeeSettingsStateService = inject(EmployeeSettingsStateService);
  private readonly timeControlIncidencesCountStateService = inject(TimeControlIncidencesCountStateService);

  /** Carga estados del usuario. */
  load(): void {
    this.currentCompanyEmployeeStateService.refresh();
    this.currentCompanySettingsStateService.refresh();
    this.currentTimeControlStateService.refresh();
    this.employeeSettingsStateService.refresh();
    this.timeControlIncidencesCountStateService.refresh();
  }

  /** Elimina estados del usuario. */
  clean(): void {
    this.currentCompanyEmployeeStateService.clean();
    this.currentCompanySettingsStateService.clean();
    this.currentTimeControlStateService.clean();
    this.employeeSettingsStateService.clean();
    this.timeControlIncidencesCountStateService.clean();
  }
}
