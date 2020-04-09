import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items.model';
import { CargaImaginesService } from '../../services/carga-imagines.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  estaSobreElementoDrop = false;

  // tslint:disable-next-line: variable-name
  constructor(public _cargaImagenes: CargaImaginesService) {}

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
      const nuevoArchivo = new FileItem(archivoTemporal);
      this.archivos.push(nuevoArchivo);
    }

    console.log(this.archivos);
  }

}
