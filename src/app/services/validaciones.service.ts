import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  public _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

  public _archivoYaFueDropeado(nombreArchivo: string, archivos: any): boolean {
    for (const archivo of archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + archivo.nombreArchivo + ' ya esta agregado');
        return true;
      }
    }

    return false;
  }

  public _prevenirBrowserAbraImagen(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  public _archivoPuedeSerCargado(archivo: File, archivos: any): boolean {
    if (!this._archivoYaFueDropeado(archivo.name, archivos) && this._esImagen(archivo.type)) {
       return true;
    } else {
      return false;
    }
  }

}
