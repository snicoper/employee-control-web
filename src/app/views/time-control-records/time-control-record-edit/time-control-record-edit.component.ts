import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BtnType } from '@aw/components/buttons/btn-loading/btn-loading.type';
import { LocalizationService } from '@aw/core/features/localizations/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { CustomValidation } from '@aw/core/validators/_index';
import { BadRequest, ResultResponse } from '@aw/models/_index';
import { TimeControlApiService } from '@aw/services/api/time-control-api.service';
import { DateTime } from 'luxon';
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
  private readonly timeControlApiService = inject(TimeControlApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  private readonly bsModalRef = inject(BsModalRef);
  private readonly localizationService = inject(LocalizationService);

  @Input({ required: true }) timeControlId = '';

  @Output() saveForm = new EventEmitter(false);

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
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
    const timeControl = this.getDataRequest();
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;
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

    const dateStart = new Date(this.form.get('dateStart')?.value);
    const dateFinish = new Date(this.form.get('dateFinish')?.value);
    const timeStart = new Date(this.form.get('timeStart')?.value);
    const timeFinish = new Date(this.form.get('timeFinish')?.value);

    const start = DateTime.local(
      dateStart.getFullYear(),
      dateStart.getMonth(),
      dateStart.getDate(),
      timeStart.getHours(),
      timeStart.getMinutes(),
      0
    );

    const end = DateTime.local(
      dateFinish.getFullYear(),
      dateFinish.getMonth(),
      dateFinish.getDate(),
      timeFinish.getHours(),
      timeFinish.getMinutes(),
      0
    );

    if (start.valueOf() > end.valueOf()) {
      this.form.get('dateFinish')?.setErrors({ startTimeGreaterThanFinish: true });

      return timeControl;
    }

    timeControl.id = this.timeControlId;
    timeControl.start = start.toUTC().toString();
    timeControl.finish = end.toUTC().toString();

    return timeControl;
  }

  private buildForm(): void {
    if (!this.timeControl) {
      return;
    }

    const timezone = this.localizationService.getTimezoneValue();
    const start = new Date(this.timeControl.start).toLocaleString('es-ES', { timeZone: timezone });
    const finish = new Date(this.timeControl.finish).toLocaleString('es-ES', { timeZone: timezone });

    this.form = this.fb.group(
      {
        dateStart: [start, [Validators.required]],
        timeStart: [start, [Validators.required]],
        dateFinish: [finish],
        timeFinish: [finish]
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
