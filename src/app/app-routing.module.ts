import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@aw/views/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@aw/views/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'errors',
    loadChildren: () => import('@aw/views/errors/errors.module').then((m) => m.ErrorsModule)
  },
  {
    path: '**',
    redirectTo: 'errors/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
