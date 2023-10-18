import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { logDebug } from '@aw/core/errors/log-messages';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { IdentityApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { RegisterValidateRequest } from './register-validate-request.model';

@Component({
  selector: 'aw-register-validate',
  templateUrl: './register-validate.component.html'
})
export class RegisterValidateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private identityApiService = inject(IdentityApiService);
  private toastrService = inject(ToastrService);

  errorMessages: string[] = [];
  siteUrls = SiteUrls;

  private readonly registerValidateRequest: RegisterValidateRequest;

  constructor() {
    this.registerValidateRequest = { code: '', userId: '' };
    this.registerValidateRequest.code = this.route.snapshot.queryParamMap.get('code') as string;
    this.registerValidateRequest.userId = this.route.snapshot.queryParamMap.get('userId') as string;
  }

  ngOnInit(): void {
    this.validateEmail();
  }

  private validateEmail(): void {
    this.identityApiService
      .create<RegisterValidateRequest, ResultResponse>(this.registerValidateRequest, ApiUrls.validateEmail)
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.errorMessages = result.errors;
          }
        },
        error: (error: HttpErrorResponse) => {
          logDebug(error.message);
        }
      });
  }
}
