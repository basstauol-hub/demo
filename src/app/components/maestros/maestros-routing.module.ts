import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestrosComponent } from './maestros.component';
import { InicioComponent } from './inicio/inicio.component';
import { MaestroPlanesDeCuentasComponent } from './maestroplanesdecuentas/maestroplanesdecuentas.component';
import { MaestroCuentasComponent } from './maestrocuentas/maestrocuentas.component';
import { MaestroAuxiliaresComponent } from './maestroauxiliares/maestroauxiliares.component';
import { MaestroMonedasComponent } from './maestromonedas/maestromonedas.component';
import { MaestroERPsComponent } from './maestroerps/maestroerps.component';
import { MaestroEmpresasComponent } from './maestroempresas/maestroempresas.component';
import { MaestroIntercompaniesComponent } from './maestrointercompanies/maestrointercompanies.component';
import { MaestroEscenariosPtoRealComponent } from './maestroescenariosptoreal/maestroescenariosptoreal.component';
import { MaestroCECOsComponent } from './maestrocecos/maestrocecos.component';
import { MaestroAgrupadorAuxiliaresComponent } from './maestroagrupadorauxiliares/maestroagrupadorauxiliares.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MaestroReglasComponent } from './maestroreglas/maestroreglas.component';
import { BuquesComponent } from './buques/buques.component';
import { PracticosComponent } from './practicos/practicos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ZonasComponent } from './zonas/zonas.component';
import { ServicioPracticajeComponent } from './serviciospracticaje/serviciopracticaje/serviciopracticaje.component';
import { ServiciosPracticajeComponent } from './serviciospracticaje/serviciospracticaje.component';
import { PropiedadesPageComponent } from '../maestros/bootstrap/propiedades-page/propiedades-page.component';
import { PropietariosPageComponent } from './propietarios/propietarios-page/propietarios_page.component';
import { InquilinosPageComponent } from './inquilinos/inquilinos-page/inquilinos-page.component';

const routes: Routes = [
  {
    path: '',
    component: MaestrosComponent,
    children: [
      { path: '', component: InicioComponent },
      {
        path: 'maestroempresas',
        component: MaestroEmpresasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'maestrocuentas',
        component: MaestroCuentasComponent,
        canActivate: [AuthGuard],
      },
/*       {
        path: 'buques',
        component: BuquesComponent,
        canActivate: [AuthGuard],
      }, */
      {
        path: 'practicos',
        component: PracticosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'serviciospracticaje',
        component: ServiciosPracticajeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'zonas',
        component: ZonasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'propiedades',
        component: PropiedadesPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'propietarios',
        component: PropietariosPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'inquilinos',
        component: InquilinosPageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestrosRoutingModule {}
