import { Categoria } from "./categoria";

export class Nota {
  id?: number;
  titulo: string;
  conteudo: string;
  tema: Tema;
  categoria?: Categoria;
  arquivada: boolean;

  constructor(titulo: string, conteudo: string, tema: Tema, arquivada: boolean, id?: number, categoria?: Categoria) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.tema = tema;
    this.categoria = categoria;
    this.arquivada = arquivada;
  }
}

type Tema = 'info' | 'warning' | 'danger' | 'dark';