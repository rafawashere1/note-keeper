import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/models/nota';
import { NotaService } from '../../../services/nota.service';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css'],
})
export class ListarNotasComponent implements OnInit {
  notas: Nota[];
  categorias: Categoria[];

  constructor(private notaService: NotaService, private categoriaService: CategoriaService, private toastrService: ToastrService) {
    this.notas = [];
    this.categorias = [];
   }

   ngOnInit(): void {
    this.selecionarTodasNotas()
     
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;
    });
   }
  
   transferirParaArquivadas(nota: Nota) {
    nota.arquivada = true;
    this.notaService.editar(nota).subscribe(() => {
      this.toastrService.info(`Nota ${nota.titulo} arquivada`, '', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
  
  filtrarNotasPorCategoria(categoria: Categoria | null) {
    if (categoria === null) {
      this.selecionarTodasNotas();
      return;
    }

    this.selecionarNotasPorCategoria(categoria);
  }

  selecionarTodasNotas() {
    this.notaService.selecionarTodos().subscribe((notas) => {
      this.notas = notas;
    })
  }

  selecionarNotasPorCategoria(categoria: Categoria) {
    this.notaService.selecionarNotasPorCategoria(categoria).subscribe((notas) => {
      this.notas = notas;
    })
  }
}