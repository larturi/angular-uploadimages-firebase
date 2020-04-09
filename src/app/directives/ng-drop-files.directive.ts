import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { FileItem } from '../models/file-items.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() archivos: FileItem[] = [];

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirBrowserAbraImagen(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transferencia = this.getTransferencia(event);

    if (!transferencia) {
       return;
    }

    this.extraerArchivos(transferencia.files);

    this._prevenirBrowserAbraImagen(event);

    this.mouseSobre.emit(false);

  }

  private getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.orinalEvent.dataTransfer;
  }

  private extraerArchivos(archivosLista: FileList) {
    // console.log(archivosLista);
    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

  // Validaciones

  private _archivoPuedeSerCargado(archivo: File): boolean {
     if (!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)) {
        return true;
     } else {
       return false;
     }
  }

  private _prevenirBrowserAbraImagen(event) {
      event.preventDefault();
      event.stopPropagation();
  }

  private _archivoYaFueDropeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + archivo.nombreArchivo + ' ya esta agregado');
        return true;
      }
    }

    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }



}
