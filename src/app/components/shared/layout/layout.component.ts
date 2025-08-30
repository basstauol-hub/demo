// layout.component.ts - Versión actualizada sin Material/PrimeNG
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { Desencriptar } from '../functions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  MODULO_ID = 0;
  appName = '';
  displayName = '';
  photoURL = '';

  // Estados de paneles
  showProfilePanel = false;
  showCalendarPanel = false;
  showScrollTop = false;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.appName = environment.appName;
      this.cargarUsuario(Desencriptar(sessionStorage.getItem('usu_id')));
    } catch (ex) {
      this.displayName = 'Error cargando usuario';
    }
  }

  async cargarUsuario(usu_id: string) {
    this.usuarioService.getById(usu_id).subscribe(async (data) => {
      this.displayName = data.usu_nombre + ' ' + data.usu_apellido;
      this.photoURL = await this.authService.currentUserPhotoURL;
    });
  }

  // Manejar clics fuera de los paneles
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    // Cerrar panel de perfil si se hace clic fuera
    if (!target.closest('.profile-section')) {
      this.showProfilePanel = false;
    }

    // Cerrar panel de calendario si se hace clic fuera
    if (!target.closest('.calendar-btn') && !target.closest('.calendar-panel')) {
      this.showCalendarPanel = false;
    }
  }

  // Manejar scroll para mostrar/ocultar botón scroll-to-top
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showScrollTop = window.pageYOffset > 300;
  }

  toggleProfilePanel(event: Event) {
    event.stopPropagation();
    this.showProfilePanel = !this.showProfilePanel;
    this.showCalendarPanel = false; // Cerrar otros paneles
  }

  toggleCalendarPanel(event: Event) {
    event.stopPropagation();
    this.showCalendarPanel = !this.showCalendarPanel;
    this.showProfilePanel = false; // Cerrar otros paneles
  }

  editProfile() {
    // Implementar navegación a editar perfil
    this.showProfilePanel = false;
    // this.router.navigate(['/profile/edit']);
  }

  changePassword() {
    // Implementar navegación a cambiar contraseña
    this.showProfilePanel = false;
    // this.router.navigate(['/profile/change-password']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  refreshProfileFromChild($event: any) {
    this.photoURL =
      this.authService.currentUserPhotoURL + '?' + new Date().getTime();
  }
}
