import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Propiedad, CreatePropiedadRequest, TipoPropiedad } from '../interfaces/propiedad.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  private readonly API_BASE_URL = 'https://localhost:44382/api/propiedades';
  private readonly TIPOS_API_URL = 'https://localhost:44382/api/tipospropiedad';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.message || error?.message || `HTTP error! status: ${error?.status}`;
    return throwError(() => new Error(errorMessage));
  }

  getList(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.API_BASE_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.API_BASE_URL}/Get/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(propiedad: CreatePropiedadRequest): Observable<Propiedad> {
    return this.http.post<Propiedad>(this.API_BASE_URL, propiedad)
      .pipe(catchError(this.handleError));
  }

  update(id: number, propiedad: CreatePropiedadRequest): Observable<Propiedad> {
    return this.http.put<Propiedad>(`${this.API_BASE_URL}/Put/${id}`, propiedad)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_BASE_URL}/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  getTiposPropiedad(): Observable<TipoPropiedad[]> {
    return this.http.get<TipoPropiedad[]>(this.TIPOS_API_URL)
      .pipe(catchError(this.handleError));
  }
}
