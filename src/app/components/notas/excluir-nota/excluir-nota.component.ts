import { Component, OnInit } from '@angular/core';
import { NotaService } from '../../../services/nota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Nota } from 'src/app/models/nota';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-nota',
  templateUrl: './excluir-nota.component.html',
  styleUrls: ['./excluir-nota.component.css']
})
  
export class ExcluirNotaComponent implements OnInit {
  nota: Nota;

  constructor(
    private notaService: NotaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.nota = new Nota('', '', 'dark', 0);
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.notaService.selecionarPorId(id).subscribe((nota) => {
      this.nota = nota;
    });
  }

  excluirNota() {
    this.notaService.excluir(this.nota).subscribe((notaExcluida) => {
      this.toastService.success(`Nota ${notaExcluida.titulo} excluída com sucesso.`, 'Sucesso');

      this.router.navigate(['/notas', 'listar']);
    });
  }
}
