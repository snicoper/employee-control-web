import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
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

  @Output() saveForm = new EventEmitter(false);

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
    const timeControl = this.getDataRequest();
    const url = urlReplaceParams(ApiUrls.timeControl.updateTimeControl, { id: this.timeControlId });

    this.timeControlApiService
      .put<TimeControlRecordRequest, ResultResponse>(timeControl, url)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Tiempo actualizado con éxito.');
          this.saveForm.emit(true);
          this.bsModalRef.hide();
        }
      });
  }

  private getDataRequest(): TimeControlRecordRequest {
    const timeControl = {} as TimeControlRecordRequest;
    const dateStartSelected = new Date(this.form.get('dateStart')?.value);
    const dateFinishSelected = new Date(this.form.get('dateFinish')?.value);
    const timeStartSelected = new Date(this.form.get('timeStart')?.value);
    const timeFinishSelected = new Date(this.form.get('timeFinish')?.value);

    timeControl.id = this.timeControlId;
    timeControl.start = new Date(
      dateStartSelected.getFullYear(),
      dateStartSelected.getMonth(),
      dateStartSelected.getDay(),
      timeStartSelected.getHours(),
      timeStartSelected.getMinutes(),
      0
    );
    timeControl.finish = new Date(
      dateFinishSelected.getFullYear(),
      dateFinishSelected.getMonth(),
      dateFinishSelected.getDay(),
      timeFinishSelected.getHours(),
      timeFinishSelected.getMinutes(),
      0
    );

    return timeControl;
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
