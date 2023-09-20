import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private notaService: NotaService, private categoriaService: CategoriaService, private toastrService: ToastrService) {
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
      this.toastrService.info(`Nota ${nota.titulo} desarquivada`, '', {
        positionClass: 'toast-bottom-right'
      });
    });
  }

  filtrarNotasPorCategoria(categoria: Categoria | null) {
    if (categoria === null) {
      this.selecionarNotasArquivadas();
      return;
    }

    this.selecionarNotasArquivadasPorCategoria(categoria);
  }
  
  selecionarNotasArquivadas() {
    this.notaService.selecionarTodos().subscribe((notas) => {
      this.notas = notas;
    })
  }

  selecionarNotasArquivadasPorCategoria(categoria: Categoria) {
    this.notaService.selecionarNotasPorCategoria(categoria).subscribe((notas) => {
      this.notas = notas;
    })
  }
}
