import { Routes } from '@angular/router';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

export const routes: Routes = [
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
    title: 'Recordar contraseña'
  },
  {
    path: 'restore-password',
    component: RestorePasswordComponent,
    title: 'Cambiar contraseña olvidada'
  }
];
