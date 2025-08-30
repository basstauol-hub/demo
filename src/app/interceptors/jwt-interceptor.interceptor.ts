import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { Desencriptar } from '../components/shared/functions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {
    const token = localStorage.getItem('jwt');

    if (sessionStorage.getItem('usu_id') == null) {
      this.router.navigateByUrl('/login');

    }
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (!headers.has('authorization')) {
      headers = headers.append(
        'authorization',
        'Bearer ' + localStorage.getItem('jwt')
      );
    }

    const clonedReq = req.clone({
      headers: headers,
    });

    /*     const clonedReq = req.clone({
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('jwt')// ,
        // 'http-context': Desencriptar(sessionStorage.getItem('usu_id') + ''),
      }),
    }); */

    return next.handle(clonedReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Manejar la respuesta
          }
        },
        (error: HttpErrorResponse) => {
          try {
            if (error.status === 401) {
              this.authService.logOut();
              this.router.navigate(['/login']);
            }
          } catch (e) {}
        }
      )
    );
  }
}
