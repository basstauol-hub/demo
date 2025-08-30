import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrosRoutingModule } from './maestros-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaestrosComponent } from './maestros.component';
import { InicioComponent } from './inicio/inicio.component';
/* import { LayoutComponent } from './layout/layout.component'; */
import { NodeService } from '../seguridad/tree/nodeservice';
import { MaestroPlanesDeCuentasComponent } from './maestroplanesdecuentas/maestroplanesdecuentas.component';
import { MaestroPlanDeCuentaComponent } from './maestroplanesdecuentas/maestroplandecuenta/maestroplandecuenta.component';
import { MaestroCuentasComponent } from './maestrocuentas/maestrocuentas.component';
import { MaestroCuentaComponent } from './maestrocuentas/maestrocuenta/maestrocuenta.component';
import { MaestroAuxiliaresComponent } from './maestroauxiliares/maestroauxiliares.component';
import { MaestroAuxiliarComponent } from './maestroauxiliares/maestroauxiliar/maestroauxiliar.component';
import { MaestroMonedasComponent } from './maestromonedas/maestromonedas.component';
import { MaestroMonedaComponent } from './maestromonedas/maestromoneda/maestromoneda.component';
import { MaestroERPsComponent } from './maestroerps/maestroerps.component';
import { MaestroERPComponent } from './maestroerps/maestroerp/maestroerp.component';
import { MaestroEmpresasComponent } from './maestroempresas/maestroempresas.component';
import { MaestroEmpresaComponent } from './maestroempresas/maestroempresa/maestroempresa.component';
import { MaestroIntercompaniesComponent } from './maestrointercompanies/maestrointercompanies.component';
import { MaestroIntercompanyComponent } from './maestrointercompanies/maestrointercompany/maestrointercompany.component';
import { MaestroEscenariosPtoRealComponent } from './maestroescenariosptoreal/maestroescenariosptoreal.component';
import { MaestroEscenarioPtoRealComponent } from './maestroescenariosptoreal/maestroescenarioptoreal/maestroescenarioptoreal.component';
import { MaestroCECOsComponent } from './maestrocecos/maestrocecos.component';
import { MaestroCECOComponent } from './maestrocecos/maestroceco/maestroceco.component';
import { MaestroAgrupadorAuxiliaresComponent } from './maestroagrupadorauxiliares/maestroagrupadorauxiliares.component';
import { MaestroAgrupadorAuxiliarComponent } from './maestroagrupadorauxiliares/maestroagrupadorauxiliar/maestroagrupadorauxiliar.component';
import { MaestroReglasComponent } from './maestroreglas/maestroreglas.component';
import { MaestroReglaComponent } from './maestroreglas/maestroregla/maestroregla.component';
import { BuquesComponent } from './buques/buques.component';
import { PracticoComponent } from './practicos/practico/practico.component';
import { ProveedorComponent } from './proveedores/proveedor/proveedor.component';
import { ZonasComponent } from './zonas/zonas.component';
import { ZonaComponent } from './zonas/zona/zona.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { PracticosComponent } from './practicos/practicos.component';
import { BuqueComponent } from './buques/buque/buque.component';


import { ServicioPracticajeComponent } from './serviciospracticaje/serviciopracticaje/serviciopracticaje.component';
import { ServiciosPracticajeComponent } from './serviciospracticaje/serviciospracticaje.component';
import { PropiedadesPageComponent } from './bootstrap/propiedades-page/propiedades-page.component';
import { PropiedadDetailComponent } from './bootstrap/propiedad-detail/propiedad-detail.component';
import { PropiedadFormComponent } from './bootstrap/propiedad-form/propiedad-form.component';
import { PropiedadesTableComponent } from './bootstrap/propiedades-table/propiedades-table.component';
import { PropietarioSelectorComponent } from './bootstrap/propietario-selector/propietario-selector.component';
import { ConfirmDialogComponent } from './bootstrap/confirm-dialog/confirm-dialog.component';
import { PropietariosPageComponent } from './propietarios/propietarios-page/propietarios_page.component';
import { PropietariosTableComponent } from './propietarios/propietarios-table/propietarios_table.component';
import { InquilinosPageComponent } from './inquilinos/inquilinos-page/inquilinos-page.component';

@NgModule({
  declarations: [
    MaestrosComponent,
    InicioComponent,
    /* LayoutComponent, */
    MaestroPlanesDeCuentasComponent,
    MaestroPlanDeCuentaComponent,
    MaestroCuentasComponent,
    MaestroCuentaComponent,
    MaestroAuxiliaresComponent,
    MaestroAuxiliarComponent,
    MaestroMonedasComponent,
    MaestroMonedaComponent,
    MaestroERPsComponent,
    MaestroERPComponent,
    MaestroEmpresasComponent,
    MaestroEmpresaComponent,
    MaestroIntercompaniesComponent,
    MaestroIntercompanyComponent,
    MaestroEscenariosPtoRealComponent,
    MaestroEscenarioPtoRealComponent,
    MaestroCECOsComponent,
    MaestroCECOComponent,
    MaestroAgrupadorAuxiliaresComponent,
    MaestroAgrupadorAuxiliarComponent,
    MaestroReglasComponent,
    MaestroReglaComponent,
    BuquesComponent,
    BuqueComponent,
    PracticoComponent,
    PracticosComponent,
    ProveedorComponent,
    ProveedoresComponent,
    ServiciosPracticajeComponent,
    ServicioPracticajeComponent,
    ZonasComponent,
    ZonaComponent,
  ],
  imports: [CommonModule,
    MaestrosRoutingModule,
    SharedModule,
    PropiedadesPageComponent,
    PropiedadDetailComponent,
    PropiedadFormComponent,
    PropiedadesTableComponent,
    PropiedadDetailComponent,
    PropiedadFormComponent,
    PropietarioSelectorComponent,
    PropietariosPageComponent,
    PropietariosTableComponent,

  ],
  providers: [NodeService],
})
export class MaestrosModule { }
