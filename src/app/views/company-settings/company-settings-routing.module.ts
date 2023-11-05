import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';

const routes: Routes = [
  {
    path: '',
    component: CompanySettingsDetailsComponent,
    data: { title: 'Configuración de empresa' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingsRoutingModule {}
