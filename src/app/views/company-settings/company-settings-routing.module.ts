import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingsComponent } from './company-settings.component';

const routes: Routes = [
  {
    path: '',
    component: CompanySettingsComponent,
    data: { title: 'Configuración de empresa' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingsRoutingModule {}
