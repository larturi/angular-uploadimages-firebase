import { Directive, EventEmitter, ElementRef, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
import { FileItem } from '../models/file-items.model';
import { ValidacionesService } from '../services/validaciones.service';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() archivos: FileItem[] = [];

  constructor(public vs: ValidacionesService) { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.vs._prevenirBrowserAbraImagen(event);
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

    this.vs._prevenirBrowserAbraImagen(event);

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

      if (this.vs._archivoPuedeSerCargado(archivoTemporal, this.archivos)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

}
