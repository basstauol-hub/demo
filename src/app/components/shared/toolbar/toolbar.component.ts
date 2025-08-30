import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Funcion } from 'src/app/interfaces/seg_funciones';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionesService } from 'src/app/services/funcion.service';
import { UsuariosService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { Desencriptar } from '../functions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() MODULO_ID = 0;
  // MODULO_ID = 1034;
  funciones: Funcion[] = [];
  user = null;
  appName = '';
  displayName = '';
  photoURL = '';
  items: MenuItem[];

  constructor(
    private authService: AuthService,
    private funcionesService: FuncionesService,
    private usuarioService: UsuariosService
  ) {}

  async ngOnInit() {
    try {
      this.appName = environment.appName;
      this.cargarMenu();
      this.cargarUsuario(Desencriptar(sessionStorage.getItem('usu_id')));
    } catch (ex) {
      this.displayName = 'error!!';
    }
  }

  parse(x, y) {
    if (x === '') {
      return null;
    }
    return JSON.parse(x)[y];
  }

  cargarMenu() {
    this.funcionesService
      .getMenu(Desencriptar(sessionStorage.getItem('usu_id')))
      .subscribe((data) => {
        this.funciones = data;
      });
  }

  async cargarUsuario(usu_id: string) {
    this.usuarioService.getById(usu_id).subscribe(async (data) => {
      this.displayName = data.usu_nombre + ' ' + data.usu_apellido;
      this.photoURL = await this.authService.currentUserPhotoURL;
    });
  }

  refreshProfileFromChild($event) {
    this.photoURL =
      this.authService.currentUserPhotoURL + '?' + new Date().getTime();
  }
}
