import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';

@Component({
  selector: 'app-card-nota-arquivada',
  templateUrl: './card-nota-arquivada.component.html',
  styleUrls: ['./card-nota-arquivada.component.css']
})
export class CardNotaArquivadaComponent {
  @Input() nota: Nota = {
    id: 0,
    titulo: 'Lavar o cachorro 🦮',
    conteudo: 'Pegar a toalha > Pegar o Shampoo',
    tema: 'dark',
    arquivada: false,
    categoria: new Categoria('Lazer', 0)!
  };

  @Output() desarquivarNota = new EventEmitter<any>();

  transferirParaDesarquivadas(nota: any) {
    this.desarquivarNota.emit(nota);
  }
}
