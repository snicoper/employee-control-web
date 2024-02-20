import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './user-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: UserSettingsComponent,
    data: { title: 'Configuración de usuario' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule {}
