import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  // categorias existentes en la api
  categorias = ['business', 'entertainment', 'general', 'health', 'science',  'sports',  'technology'];

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria( event ) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event? ) {
    this.noticiasService.getTopHeadlinesCategoria(categoria)
    .subscribe( resp => {
      this.noticias.push( ...resp.articles );

      if ( event ) {
        event.target.complete();
      }
    });
  }

  loadData( event ) {
    this.cargarNoticias( this.segment.value, event );
  }

}
