import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }


  loadData( event ) {
    this.cargarNoticias( event );
  }

  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadLines()
    .subscribe( resp => {
      if ( resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      // spread javascript operator '...Array'
      // El operador de propagación spread operator permite que una expresión sea
      // expandida en situaciones donde se esperan múltiples argumentos (llamadas a
      // funciones) o múltiples elementos (arrays literales).
      // Manera elegante de concatenar arreglos sin sufrir que tu respuesta es un objeto.
      this.noticias.push( ...resp.articles);

      if (event) {
        event.target.complete();
      }

    });
  }

}
