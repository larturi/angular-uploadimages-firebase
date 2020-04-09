import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items.model';
import { CargaImaginesService } from '../../services/carga-imagines.service';
import { ValidacionesService } from '../../services/validaciones.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  estaSobreElementoDrop = false;

  // tslint:disable-next-line: variable-name
  constructor(public _cargaImagenes: CargaImaginesService,
              public vs: ValidacionesService) {}

  ngOnInit(): void {
  }

  cargarImagenes() {
      this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarImagenes() {
     this.archivos = [];
  }

  onInputChange(event) {

    // console.log(event.srcElement.files);

    const archivosSeleccionados = event.srcElement.files;

    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivosSeleccionados)) {
      const archivoTemporal = archivosSeleccionados[propiedad];

      if (this.vs._archivoPuedeSerCargado(archivoTemporal, this.archivos)) {
         const nuevoArchivo = new FileItem(archivoTemporal);
         this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

}
