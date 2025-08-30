import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import  { Inquilino, CreateInquilinoRequest } from "../interfaces/inquilino.interfaces"

@Injectable({
  providedIn: "root",
})
export class InquilinosService {
  private readonly API_BASE_URL = "https://localhost:44382/api/inquilinos"

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<never> {
    const errorMessage = error?.error?.message || error?.message || `HTTP error! status: ${error?.status}`
    return throwError(() => new Error(errorMessage))
  }

  getList(): Observable<Inquilino[]> {
    return this.http.get<Inquilino[]>(this.API_BASE_URL).pipe(catchError(this.handleError))
  }

  getById(id: number): Observable<Inquilino> {
    return this.http.get<Inquilino>(`${this.API_BASE_URL}/Get/${id}`).pipe(catchError(this.handleError))
  }

  create(inquilino: CreateInquilinoRequest): Observable<Inquilino> {
    return this.http.post<Inquilino>(this.API_BASE_URL, inquilino).pipe(catchError(this.handleError))
  }

  update(id: number, inquilino: CreateInquilinoRequest): Observable<Inquilino> {
    return this.http.put<Inquilino>(`${this.API_BASE_URL}/Put/${id}`, inquilino).pipe(catchError(this.handleError))
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_BASE_URL}/Delete/${id}`).pipe(catchError(this.handleError))
  }
}
