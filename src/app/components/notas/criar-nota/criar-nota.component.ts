import { Component, OnInit } from '@angular/core';
import { Nota } from 'src/app/models/nota';
import { NotaService } from '../../../services/nota.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css'],
})

export class CriarNotaComponent implements OnInit{
  nota: Nota;
  categorias: Categoria[];

  constructor(
    private notaService: NotaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.nota = new Nota('', '', 'dark', false, 0);
    this.categorias = [];
  }
  ngOnInit(): void {
    this.categoriaService.selecionarTodos().subscribe((categorias) => this.categorias = categorias);
  }

  criarNota() { 
    this.notaService.criar(this.nota).subscribe((nota) => {
      this.toastrService.success(`Nota ${nota.titulo} criada com sucesso.`, 'Sucesso');

      this.router.navigate(['/notas', 'listar']);
    });
  }
}