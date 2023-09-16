import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  categoria: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.categoria = new Categoria('', 0);
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.categoriaService.selecionarPorId(id).subscribe((categoria) => {
      this.categoria = categoria;
    });
  }

  editarCategoria() {
    this.categoriaService.editar(this.categoria).subscribe((categoriaEditada) => {
      this.toastrService.success(`Categoria ${categoriaEditada.titulo} editada com sucesso.`, 'Sucesso');

      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
