import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items.model';
import { CargaImaginesService } from '../../services/carga-imagines.service';

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

}
