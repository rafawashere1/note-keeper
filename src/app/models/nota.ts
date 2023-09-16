import { Categoria } from "./categoria";

export class Nota {
  id?: number;
  titulo: string;
  conteudo: string;
  tema: Tema;
  categoria?: Categoria;

  constructor(titulo: string, conteudo: string, tema: Tema, id?: number, categoria?: Categoria) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.tema = tema;
    this.categoria = categoria;
  }
}

type Tema = 'info' | 'warning' | 'danger' | 'dark';