import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticatedResponse } from '../interfaces/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Desencriptar } from '../components/shared/functions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  async checkLoggedIn(): Promise<boolean> {
    const token = localStorage.getItem('jwt');

    // Verificar si el usuario está autenticado basándonos en el 'usu_id' del sessionStorage
    if (!this.isUserAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Si el token es válido, permitir el acceso
    if (this.isTokenValid(token)) {
      return true;
    }

    // Intentar refrescar el token si ha expirado
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  private isUserAuthenticated(): boolean {
    return sessionStorage.getItem('usu_id') !== null;
  }

  private isTokenValid(token: string | null): boolean {
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = localStorage.getItem('jwt');
    const userId = sessionStorage.getItem('usu_id');

    // Si no hay usuario logueado, redirige al login
    if (!userId) {
      this.router.navigateByUrl('/login');
      return false;
    }

    // Si el token no está caducado, permite la activación
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.jwtHelper.decodeToken(token);  // No es necesario almacenar el resultado si no se usa
      return true;
    }

    // Si el token ha caducado, intenta refrescarlo
    return await this.tryRefreshingTokens(token);
  }

  private async tryRefreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    const userId = sessionStorage.getItem('usu_id');
    const projectId = sessionStorage.getItem('pro_id');

    // Si no hay tokens disponibles, redirige al login
    if (!token || !refreshToken || !userId || !projectId) {
      this.redirectToLogin();
      return false;
    }

    // Prepara las credenciales para el refresh
    const credentials = this.prepareRefreshCredentials(token, refreshToken, userId, projectId);

    try {
      const refreshRes = await this.refreshToken(credentials);
      this.storeTokens(refreshRes);
      return true;
    } catch (error) {
      this.redirectToLogin();
      return false;
    }
  }

  private prepareRefreshCredentials(token: string, refreshToken: string, userId: string, projectId: string): string {
    return JSON.stringify({
      accessToken: token,
      refreshToken,
      usu_id: Desencriptar(userId),
      pro_id: Desencriptar(projectId),
    });
  }

  private refreshToken(credentials: string): Promise<AuthenticatedResponse> {
    return new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.http
        .post<AuthenticatedResponse>(`${environment.apiURL}api/token/refresh`, credentials, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        .subscribe({
          next: (response: AuthenticatedResponse) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  private storeTokens(response: AuthenticatedResponse): void {
    localStorage.setItem('jwt', response.token);
    localStorage.setItem('refresh_token', response.refresh_token);
    sessionStorage.setItem('usu_id', response.usu_id);
    sessionStorage.setItem('pro_id', response.pro_id);
  }

  private redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}
