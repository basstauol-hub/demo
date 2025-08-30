// sidebar.component.ts - Versión sin Material/PrimeNG
import { Component, Input, OnInit } from '@angular/core';
import { Funcion } from 'src/app/interfaces/seg_funciones';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionesService } from 'src/app/services/funcion.service';
import { UsuariosService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { Desencriptar } from '../functions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() MODULO_ID = 0;
  funciones: Funcion[] = [];
  user = null;
  appName = '';
  displayName = '';
  photoURL = '';

  // Propiedades para manejar el estado del sidebar
  isCollapsed = false;
  isHovering = false;

  // Array para manejar qué elementos están expandidos
  expandedItems: number[] = [];

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

  parse(x: any, y: string) {
    if (x === '' || x === null || x === undefined) {
      return null;
    }
    try {
      return JSON.parse(x)[y];
    } catch (error) {
      return null;
    }
  }

  cargarMenu() {
    this.funcionesService
      .getMenu(Desencriptar(sessionStorage.getItem('usu_id')))
      .subscribe((data) => {
        this.funciones = data;
        // Auto-expandir el módulo actual si existe
        if (this.MODULO_ID && !this.expandedItems.includes(this.MODULO_ID)) {
          this.expandedItems.push(this.MODULO_ID);
        }
      });
  }

  async cargarUsuario(usu_id: string) {
    this.usuarioService.getById(usu_id).subscribe(async (data) => {
      this.displayName = data.usu_nombre + ' ' + data.usu_apellido;
      this.photoURL = await this.authService.currentUserPhotoURL;
    });
  }

  refreshProfileFromChild($event: any) {
    this.photoURL =
      this.authService.currentUserPhotoURL + '?' + new Date().getTime();
  }

  // Métodos para manejar el colapso del sidebar
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onMouseEnter() {
    this.isHovering = true;
  }

  onMouseLeave() {
    this.isHovering = false;
  }

  // Método para determinar si el sidebar debe mostrarse expandido
isItemExpanded(itemId: number): boolean {
  return this.expandedItems.includes(itemId);
}

  // Métodos para manejar la expansión de elementos del menú
  toggleExpansion(itemId: number) {
    if (this.isCollapsed) {
      return; // No permitir expansión cuando el sidebar está colapsado
    }

    const index = this.expandedItems.indexOf(itemId);
    if (index > -1) {
      this.expandedItems.splice(index, 1);
    } else {
      this.expandedItems.push(itemId);
    }
  }

  isExpanded(itemId: number): boolean {
    return this.expandedItems.includes(itemId);
  }
}
