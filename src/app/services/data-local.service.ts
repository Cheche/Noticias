import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage,
               public toastController: ToastController ) {
    // cuando se cargue el servicio, precargo los datos locales
    // en este caso sera al tratar de cargar los favoritos o
    // al tratar de guardar los favoritos
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const tost = await this.toastController.create({
      message,
      duration: 1500
    });
    tost.present();
  }


  guardarNoticia( noticia: Article ) {

    // validacion para no repetir elementos. no tengo ID, valido por Titulo
    const exist = this.noticias.find( noti => noti.title === noticia.title );

    if ( !exist ) {
      this.noticias.unshift( noticia ); // unshift es un push pero al inicio de la lista.
      this.storage.set( 'favoritos', this.noticias );
    }

    this.presentToast( 'Agregado a favoritos' );
  }


  async cargarFavoritos() {
    const favoritos = await this.storage.get( 'favoritos' );
    console.log('async await', favoritos);

    if ( favoritos ) {
      this.noticias = favoritos;
    } else {
      this.noticias = [];
    }
  }


  borrarNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter(
      noti => noti.title !== noticia.title
    );

    this.storage.set( 'favoritos', this.noticias );
    this.presentToast( 'Borrado de favoritos' );
  }

}
