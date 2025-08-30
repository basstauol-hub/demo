// propietarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Propietario, CreatePropietarioRequest, UpdatePropietarioRequest, ApiResponse } from '../interfaces/propietario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropietariosService {
  private readonly API_BASE_URL = 'https://localhost:44382/api/propietarios';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.message || error?.message || `HTTP error! status: ${error?.status}`;
    return throwError(() => new Error(errorMessage));
  }

  getList(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(this.API_BASE_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.API_BASE_URL}/Get/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(propietario: CreatePropietarioRequest): Observable<Propietario> {
    return this.http.post<Propietario>(this.API_BASE_URL, propietario)
      .pipe(catchError(this.handleError));
  }

  update(id: number, propietario: UpdatePropietarioRequest): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.API_BASE_URL}/Put/${id}`, propietario)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_BASE_URL}/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Método adicional para búsqueda
  search(term: string): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.API_BASE_URL}/search?q=${encodeURIComponent(term)}`)
      .pipe(catchError(this.handleError));
  }

  // Método para obtener propietarios con estadísticas
  getWithStats(id: number): Observable<Propietario & { stats?: any }> {
    return this.http.get<Propietario & { stats?: any }>(`${this.API_BASE_URL}/GetWithStats/${id}`)
      .pipe(catchError(this.handleError));
  }
}
