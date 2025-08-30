import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticatedResponse } from '../interfaces/authenticated-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Desencriptar } from '../components/shared/functions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard2 implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('jwt');

    if (sessionStorage.getItem('usu_id') == null) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.jwtHelper.decodeToken(token);
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(['login']);
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem('refresh_token');
    if (!token || !refreshToken) {
      console.log('tryRefreshingTokens -> false');
      return false;
    }

    const credentials = JSON.stringify({
      accessToken: token,
      refreshToken,
      usu_id: Desencriptar(sessionStorage.getItem('usu_id')),
      pro_id: Desencriptar(sessionStorage.getItem('pro_id')),
    });

    let isRefreshSuccess: boolean;

    // 'https://localhost:44382/api/token/refresh',
    const refreshRes = await new Promise<AuthenticatedResponse>(
      (resolve, reject) => {
        this.http
          .post<AuthenticatedResponse>(
            environment.apiURL + 'api/token/refresh',
            credentials,
            {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            }
          )
          .subscribe({
            next: (res: AuthenticatedResponse) => resolve(res),
            error: (_) => {
              // tslint:disable-next-line: no-unused-expression
              reject;
              isRefreshSuccess = false;
            },
          });
      }
    );
    localStorage.setItem('jwt', refreshRes.token);
    localStorage.setItem('refresh_token', refreshRes.refresh_token);
    sessionStorage.setItem('usu_id', refreshRes.usu_id);
    sessionStorage.setItem('pro_id', refreshRes.pro_id);
    isRefreshSuccess = true;

    return isRefreshSuccess;
  }
}
