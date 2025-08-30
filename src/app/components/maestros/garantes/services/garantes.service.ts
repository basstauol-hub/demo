import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Garante, CreateGaranteRequest, UpdateGaranteRequest } from '../interfaces/garante.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GarantesService {
  private readonly API_BASE_URL = 'https://localhost:44382/api/garantes';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.message || error?.message || `HTTP error! status: ${error?.status}`;
    return throwError(() => new Error(errorMessage));
  }

  getList(): Observable<Garante[]> {
    return this.http.get<Garante[]>(this.API_BASE_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Garante> {
    return this.http.get<Garante>(`${this.API_BASE_URL}/Get/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(garante: CreateGaranteRequest): Observable<Garante> {
    return this.http.post<Garante>(this.API_BASE_URL, garante)
      .pipe(catchError(this.handleError));
  }

  update(id: number, garante: UpdateGaranteRequest): Observable<Garante> {
    return this.http.put<Garante>(`${this.API_BASE_URL}/Put/${id}`, garante)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_BASE_URL}/Delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Método adicional para búsqueda
  search(term: string): Observable<Garante[]> {
    return this.http.get<Garante[]>(`${this.API_BASE_URL}/search?q=${encodeURIComponent(term)}`)
      .pipe(catchError(this.handleError));
  }
}