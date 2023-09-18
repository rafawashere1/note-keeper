import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-listar-notas-arquivadas',
  templateUrl: './listar-notas-arquivadas.component.html',
  styleUrls: ['./listar-notas-arquivadas.component.css']
})
export class ListarNotasArquivadasComponent implements OnInit {
  notas: Nota[];
  categorias: Categoria[];

  constructor(private notaService: NotaService, private categoriaService: CategoriaService) {
    this.notas = [];
    this.categorias = [];
  }
  
  ngOnInit(): void {
    this.selecionarNotasArquivadas()
     
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  transferirParaDesarquivadas(nota: Nota) {
    nota.arquivada = false;
    this.notaService.editar(nota).subscribe(() => { 
    });
  }

  filtrarNotasPorCategoria(categoria: Categoria | null) {
    if (categoria === null) {
      this.selecionarNotasArquivadas();
      return;
    }

    this.selecionarArquivadasNotasPorCategoria(categoria);
  }
  
  selecionarNotasArquivadas() {
    this.notaService.selecionarTodos().subscribe((notas) => {
      this.notas = notas;
    })
  }

  selecionarArquivadasNotasPorCategoria(categoria: Categoria) {
    this.notaService.selecionarNotasPorCategoria(categoria).subscribe((notas) => {
      this.notas = notas;
    })
  }
}
