import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items.model';

@Injectable({
  providedIn: 'root'
})
export class CargaImaginesService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) {}

  cargarImagenesFirebase(imagenes: FileItem[]) {

    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {

      item.estadoSubiendo = true;

      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
           storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
           .put(item.archivo);


      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            (error) => console.error('Error al subir', error),
            () => {
              console.log('Imagen Cargada correctamente');

              uploadTask.snapshot.ref.getDownloadURL()
                .then((url) => {
                  item.url = url;
                  item.estadoSubiendo = false;
                  this.guardarImagen({
                    nombre: item.nombreArchivo,
                    url: item.url
                });
              });

            }
      );

    }
  }

  private guardarImagen(imagen: {nombre: string, url: string}) {
    this.db.collection(`${this.CARPETA_IMAGENES}`)
              .add(imagen);
  }
}
