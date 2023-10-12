import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BadResponse } from '@aw/models/api/_index';
import { AuthApiService } from '@aw/services/api/auth-api.service';
import { finalize } from 'rxjs';
import { RegisterRequest } from './register-request.model';

@Component({
  selector: 'aw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authApiService = inject(AuthApiService);

  form: FormGroup = this.fb.group({});
  badRequest: BadResponse | undefined;
  submitted = false;
  loading = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const registerRequest = this.form.value as RegisterRequest;

    this.authApiService
      .create<RegisterRequest, string>(registerRequest)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          // Redireccionar a register-success a falta de validación del correo.
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required]]
    });
  }
}
