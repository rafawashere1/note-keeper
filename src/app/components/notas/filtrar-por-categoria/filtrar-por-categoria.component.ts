import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-filtrar-por-categoria',
  templateUrl: './filtrar-por-categoria.component.html',
  styleUrls: ['./filtrar-por-categoria.component.css']
})
export class FiltrarPorCategoriaComponent {
  @Input({ required: true })
  categorias: Categoria[];

  @Output() onFiltroSelecionado: EventEmitter<Categoria | null>;

  constructor() {
    this.categorias = [];
    this.onFiltroSelecionado = new EventEmitter();
  }

  selecionarTodas() {
    this.onFiltroSelecionado.emit(null);
  }

  selecionarComFiltro(categoria: Categoria) {
    this.onFiltroSelecionado.emit(categoria);
  }
}
