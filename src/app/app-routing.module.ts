import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './core/types/roles';
import { AuthGuard } from './guards/_index';

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
    path: 'tests',
    data: { title: 'tests', roles: [Roles.administrator] },
    canActivate: [AuthGuard],
    loadChildren: () => import('@aw/views/tests/tests.module').then((m) => m.TestsModule)
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
