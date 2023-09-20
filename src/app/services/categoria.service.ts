import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Categoria } from '../models/categoria';
import { Nota } from '../models/nota';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root', // App module
})
export class CategoriaService {
  private API_URL = environment.API_URL + "/api/categorias/";
  private NOTAS_API_URL = environment.API_URL + "/api/notas/";

  constructor(private http: HttpClient) {

  }

  criar(categoria: Categoria): Observable<Categoria> {
   return this.http.post<Categoria>(this.API_URL, categoria);
  }

  editar(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API_URL}${categoria.id}`, categoria)
      .pipe(
        switchMap((categoriaAtualizada: any) => {
          return this.http.get<Nota[]>(`${this.API_URL}${categoria.id}/notas`)
            .pipe(
              map((notas: any[]) => {
                notas.forEach((nota: { categoria: any; id: any; }) => {
                  nota.categoria = categoriaAtualizada;
                  this.http.put<Nota>(`${this.NOTAS_API_URL}${nota.id}`, nota).subscribe();
                });
                return categoriaAtualizada;
              })
            );
        })
      );
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