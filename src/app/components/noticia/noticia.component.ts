import { Article } from 'src/app/interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos: boolean;

  constructor( private iab: InAppBrowser,
               private platform: Platform,
               private socialSharing: SocialSharing,
               private dataLocalService: DataLocalService,
               private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

  abrirNoticias() {
    // console.log('Noticia', this.noticia.url );
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
    if ( this.enFavoritos ) {
      // borrar
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('eliminar de  Favorito');
          this.dataLocalService.borrarNoticia( this.noticia );
        }
      };
    } else {
      // guardar
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticia();
        }
      },
        guardarBorrarBtn
      , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {
    /**
     * Chequeo si esta disponible cordova, es probable que este en un dispositivo movil
     * caso contrario estoy en escritorio con electron o en una web
     */
    console.log('la funcion');
    if ( this.platform.is( 'cordova' ) ) {
      // es dispositivo movil
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      // considero que es web
      // tslint:disable-next-line: no-string-literal
      if (navigator['share']) {
        // tslint:disable-next-line: no-string-literal
        navigator['share']({
            title: this.noticia.title,
            text: this.noticia.description,
            url: this.noticia.url
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se puede usar el share, el navegador no lo soporta');
      }

    }


  }
}
