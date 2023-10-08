import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { BadResponse } from '@aw/models/_index';
import { JwtService } from '@aw/services/_index';
import { AuthApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { LoginRequest } from './login-request.model';
import { LoginResponse } from './login-response.model';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  form: FormGroup;
  badRequest: BadResponse | undefined;
  submitted = false;
  invalidLogin = false;
  formTypes = FormInputTypes;
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.form = this.fb.group({});
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.invalidLogin = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const loginRequest = this.form.value as LoginRequest;

    this.authApiService
      .post<LoginRequest, LoginResponse>(loginRequest, ApiUrls.login)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: LoginResponse) => {
          this.jwtService.setTokens(result.accessToken, result.refreshToken);

          if (this.jwtService.getToken()) {
            const returnUrl = (this.route.snapshot.params['returnUrl'] as string) || '/';
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (httpError: HttpErrorResponse) => {
          this.badRequest = httpError.error as BadResponse;
          this.loading = false;

          if (httpError.status === HttpStatusCode.Unauthorized) {
            this.invalidLogin = true;
          }
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      identifier: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
}
