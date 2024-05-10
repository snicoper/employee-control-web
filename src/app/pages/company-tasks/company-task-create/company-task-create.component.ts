import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormColorPickerComponent } from '../../../components/forms/inputs/form-color-picker/form-color-picker.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { ResultValue } from '../../../models/result-response.model';
import { HttpClientApiService } from '../../../services/api/http-client-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { CompanyTaskCreateRequest } from './company-task-create-request.model';

@Component({
  selector: 'aw-company-task-create',
  templateUrl: './company-task-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDivider,
    PageBaseComponent,
    PageHeaderComponent,
    NonFieldErrorsComponent,
    BadgeComponent,
    FormInputComponent,
    FormColorPickerComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CompanyTaskCreateComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  readonly siteUrl = SiteUrl;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;

  constructor() {
    this.setBreadcrumb();
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const companyTaskCreateRequest = this.form.value as CompanyTaskCreateRequest;

    this.createCompanyTask(companyTaskCreateRequest);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrl.companyTasks.list).add('Crear tarea', SiteUrl.companyTasks.create, '', false);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      background: [CommonUtils.getRandomColorHexadecimal(), [Validators.required]],
      color: [CommonUtils.getRandomColorHexadecimal(), [Validators.required]]
    });
  }

  private createCompanyTask(companyTaskCreateRequest: CompanyTaskCreateRequest): void {
    this.httpClientApiService
      .post<CompanyTaskCreateRequest, ResultValue<string>>(
        companyTaskCreateRequest,
        ApiUrl.companyTasks.createCompanyTask
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultValue<string>) => {
          const url = CommonUtils.urlReplaceParams(SiteUrl.companyTasks.details, { id: result.value });
          this.snackBarService.success('Tarea creada con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }
}
