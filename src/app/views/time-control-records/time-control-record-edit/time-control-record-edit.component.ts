import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BtnType } from '@aw/components/buttons/btn-loading/btn-loading.type';
import { LocalizationService } from '@aw/core/features/localizations/localization.service';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { CustomValidation } from '@aw/core/validators/_index';
import { BadRequest, ResultResponse } from '@aw/models/_index';
import { TimeControlApiService } from '@aw/services/api/time-control-api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TimeControlRecordRequest } from './time-control-record-request';
import { TimeControlRecordResponse } from './time-control-record-response.model';

@Component({
  selector: 'aw-time-control-record-edit',
  templateUrl: './time-control-record-edit.component.html'
})
export class TimeControlRecordEditComponent implements OnInit {
  @Input({ required: true }) timeControlId = '';

  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  private readonly bsModalRef = inject(BsModalRef);
  private readonly localizationService = inject(LocalizationService);

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingCompanyTask = false;
  loadingForm = false;
  submitted = false;
  timeControl: TimeControlRecordResponse | undefined;
  btnType = BtnType;

  ngOnInit(): void {
    this.loadTimeControl();
  }

  handleClose(): void {
    this.bsModalRef.hide();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const timeControl = {} as TimeControlRecordRequest;
    timeControl.id = this.timeControlId;
    timeControl.start = this.form.get('timeStart')?.value;
    timeControl.finish = this.form.get('timeFinish')?.value;

    const url = urlReplaceParams(ApiUrls.timeControl.updateTimeControl, { id: this.timeControlId });

    this.timeControlApiService
      .put<TimeControlRecordRequest, ResultResponse>(timeControl, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tiempo actualizado con éxito.');
          this.bsModalRef.hide();
        }
      });
  }

  private buildForm(): void {
    if (!this.timeControl) {
      return;
    }

    const start = new Date(this.timeControl.start);
    const finish = new Date(this.timeControl.finish);
    const timezone = this.localizationService.getTimezoneValue();

    this.form = this.fb.group(
      {
        dateStart: [start, [Validators.required]],
        timeStart: [start, [Validators.required]],
        dateFinish: [finish],
        timeFinish: [finish],
        timezone: [timezone]
      },
      {
        validators: [CustomValidation.dateStartGreaterThanFinish('dateStart', 'dateFinish')]
      }
    );
  }

  private loadTimeControl(): void {
    this.loadingForm = true;
    const url = urlReplaceParams(ApiUrls.timeControl.getTimeControlById, { id: this.timeControlId });

    this.timeControlApiService
      .get<TimeControlRecordResponse>(url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result) => {
          this.timeControl = result;
          this.buildForm();
        },
        error: (error: HttpErrorResponse) => (this.badRequest = error.error)
      });
  }
}
