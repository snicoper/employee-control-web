import { Component, Input, computed, inject } from '@angular/core';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { ResultResponse } from '@aw/models/result-response.model';
import { DepartmentApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { DepartmentSelectedService } from '../department-selected.service';

@Component({
  selector: 'aw-department-details',
  templateUrl: './department-details.component.html'
})
export class DepartmentDetailsComponent {
  @Input({ required: true }) departmentId = '';

  private readonly toastrService = inject(ToastrService);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);
  private readonly departmentApiService = inject(DepartmentApiService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());
  readonly loadingDepartmentSelected = computed(() => this.departmentSelectedService.loadingDepartmentSelected());

  loadingDepartmentState = false;
  siteUrls = SiteUrls;

  get urlToEdit(): string {
    return SiteUrls.replace(SiteUrls.departments.edit, { id: this.departmentId });
  }

  handleActivateDepartment(): void {
    this.loadingDepartmentState = true;
    const data = { departmentId: this.departmentId };

    this.departmentApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.departments.activateDepartment)
      .pipe(finalize(() => (this.loadingDepartmentState = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.toastrService.success('Departamento desactivado con éxito');
            this.departmentSelectedService.loadDepartmentById(this.departmentId);
          }
        }
      });
  }

  handleDeactivateDepartment(): void {
    this.loadingDepartmentState = true;
    const data = { departmentId: this.departmentId };

    this.departmentApiService
      .put<typeof data, ResultResponse>(data, ApiUrls.departments.deactivateDepartment)
      .pipe(finalize(() => (this.loadingDepartmentState = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.toastrService.success('Departamento activado con éxito');
            this.departmentSelectedService.loadDepartmentById(this.departmentId);
          }
        }
      });
  }
}
