import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FormInputTypes } from '../../../core/types/_index';
import { ApiUrls, SiteUrls } from '../../../core/utils/_index';
import { BadRequest } from '../../../models/bad-request';
import { JwtTokenService } from '../../../services/_index';
import { AuthRestService } from '../../../services/rest/_index';
import { LoginResponse } from './login-response';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  badRequest: BadRequest | undefined;
  submitted = false;
  invalidLogin = false;
  formTypes = FormInputTypes;
  loading = false;
  siteUrls = SiteUrls;

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService,
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({});
    this.buildForm();
  }

  public handleSubmit(): void {
    this.submitted = true;
    this.invalidLogin = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authRestService
      .post(this.form.value, ApiUrls.login)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: LoginResponse) => {
          this.jwtTokenService.setToken(result.token);

          if (this.jwtTokenService.getToken()) {
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
