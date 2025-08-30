import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Propietario } from '../interfaces/propiedad.interfaces';

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

  create(propietario: any): Observable<Propietario> {
    return this.http.post<Propietario>(this.API_BASE_URL, propietario)
      .pipe(catchError(this.handleError));
  }

  update(id: number, propietario: any): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.API_BASE_URL}/Put/${id}`, propietario)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_BASE_URL}/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }
}
