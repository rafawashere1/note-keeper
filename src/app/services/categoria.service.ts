import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root', // App module
})
export class CategoriaService {
  private API_URL = 'http://localhost:3000/categorias/';

  constructor(private http: HttpClient) {

  }

  criar(categoria: Categoria): Observable<Categoria> {
   return this.http.post<Categoria>(this.API_URL, categoria);
  }

  editar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API_URL}${categoria.id}`, categoria);
  }

  excluir(categoria: Categoria): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.API_URL}${categoria.id}`);
  }

  selecionarPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}${id}`);
  }

  selecionarTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }
}