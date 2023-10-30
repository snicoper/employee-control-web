import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { DualListBoxItem } from '@aw/components/dual-list-box/dual-list-box-item.model';
import { DualListBoxResponse } from '@aw/components/dual-list-box/dual-list-box-response.model';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { ResultResponse } from '@aw/models/result-response.model';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CompanyTaskApiService } from './../../../../services/api/company-task-api.service';
import { CompanyTaskSelectedService } from './../company-task-selected.service';
import { CompanyTaskAddUserResponse } from './company-task-add-user-response.model';

@Component({
  selector: 'aw-company-task-add-users',
  templateUrl: './company-task-add-users.component.html'
})
export class CompanyTaskAddUsersComponent {
  @Output() changeComponent = new EventEmitter();

  private readonly companyTaskApiService = inject(CompanyTaskApiService);
  private readonly companyTaskSelectedService = inject(CompanyTaskSelectedService);
  private readonly toastrService = inject(ToastrService);

  readonly companyTaskSelected = computed(() => this.companyTaskSelectedService.companyTaskSelected());

  dualListBoxItems: DualListBoxItem[] = [];
  loading = false;

  constructor() {
    this.loadEmployees();
  }

  handleChangeComponent(): void {
    this.changeComponent.emit();
  }

  handleSaveChanges(dualListBoxResponse: DualListBoxResponse): void {
    if (!dualListBoxResponse.itemsToAdd.length) {
      this.handleChangeComponent();
    }

    this.loading = true;

    const companyTaskId = this.companyTaskSelected()?.id as string;
    const employeeIds = dualListBoxResponse.itemsToAdd.map((item) => item.key);
    const data = { id: companyTaskId, employeeIds: employeeIds };
    const url = ApiUrls.replace(ApiUrls.companyTasks.assignEmployeesToTask, {
      id: companyTaskId
    });

    this.companyTaskApiService
      .post<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Empleados asignados a la tarea con éxito.');
            this.handleChangeComponent();
          }
        }
      });
  }

  private loadEmployees(): void {
    this.loading = true;
    const url = ApiUrls.replace(ApiUrls.companyTasks.getEmployeesUnassignedTaskByCompanyTaskId, {
      id: this.companyTaskSelected()?.id as string
    });

    this.companyTaskApiService
      .get<CompanyTaskAddUserResponse[]>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: CompanyTaskAddUserResponse[]) => {
          result.forEach((item: CompanyTaskAddUserResponse) => {
            const newItem = { key: item.id, name: item.name, selected: false } as DualListBoxItem;
            this.dualListBoxItems.push(newItem);
          });
        }
      });
  }
}
