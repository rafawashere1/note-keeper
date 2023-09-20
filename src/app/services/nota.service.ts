import { Injectable } from '@angular/core';
import { Nota } from '../models/nota';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // App module
})
export class NotaService {

  private API_URL = environment.API_URL + "/api/notas/";

  constructor(private http: HttpClient) {

  }

  criar(nota: Nota): Observable<Nota> {
   return this.http.post<Nota>(this.API_URL, nota);
  }

  editar(nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.API_URL}${nota.id}`, nota);
  }

  excluir(nota: Nota): Observable<Nota> {
    return this.http.delete<Nota>(`${this.API_URL}${nota.id}`);
  }

  selecionarPorId(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.API_URL}${id}`);
  }

  selecionarTodos(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.API_URL);
  }

  selecionarNotasPorCategoria(categoria: Categoria): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.API_URL}?categoria.id=${categoria.id}`);
  }
}