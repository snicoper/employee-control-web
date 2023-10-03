import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInputTypes } from '@core/types/_index';
import { ApiUrls, SiteUrls } from '@core/utils/_index';
import { BadRequest } from '@models/_index';
import { JwtService } from '@services/_index';
import { AuthRestService } from '@services/rest/_index';
import { finalize } from 'rxjs';
import { LoginModel } from './login.model';
import { LoginResponse } from './login.response';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authRestService = inject(AuthRestService);
  private readonly jwtService = inject(JwtService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  form: FormGroup;
  badRequest: BadRequest | undefined;
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
    const formValue = this.form.value as LoginModel;

    this.authRestService
      .post<LoginModel, LoginResponse>(formValue, ApiUrls.login)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: LoginResponse) => {
          this.jwtService.setTokens(result.accessToken, result.refreshToken);

          if (this.jwtService.getToken()) {
            const returnUrl = (this.route.snapshot.params['returnUrl'] as string) || '/';
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
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
