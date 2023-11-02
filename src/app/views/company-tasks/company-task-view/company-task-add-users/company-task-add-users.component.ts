import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { DualListBox } from '@aw/components/dual-list-box/dual-list-box.model';
import { HtmlItemSelector } from '@aw/core/models/_index';
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

  htmlItemSelector: HtmlItemSelector[] = [];
  loading = false;

  constructor() {
    this.loadEmployees();
  }

  handleChangeComponent(): void {
    this.changeComponent.emit();
  }

  handleSaveChanges(dualListBox: DualListBox): void {
    if (!dualListBox.itemsToAdd.length) {
      this.handleChangeComponent();
    }

    this.loading = true;

    const companyTaskId = this.companyTaskSelected()?.id as string;
    const employeeIds = dualListBox.itemsToAdd.map((item) => item.id);
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
            const newItem = { id: item.id, value: item.name, selected: false } as HtmlItemSelector;
            this.htmlItemSelector.push(newItem);
          });
        }
      });
  }
}
