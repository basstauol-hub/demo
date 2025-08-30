import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '#', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'maestros',
    loadChildren: () =>
      import('./components/maestros/maestros.module').then(
        (x) => x.MaestrosModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./components/seguridad/seguridad.module').then(
        (x) => x.SeguridadModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'businessrules',
    loadChildren: () =>
      import('./components/businessrules/businessrules.module').then(
        (x) => x.BusinessRulesModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
