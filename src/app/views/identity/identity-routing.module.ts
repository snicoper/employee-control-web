import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterValidateComponent } from './register-validate/register-validate.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Registro de nuevo usuario' }
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent,
    data: { title: 'Registro completado' }
  },
  {
    path: 'register-validate',
    component: RegisterValidateComponent,
    data: { title: 'Validación de registro' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityRoutingModule {}
