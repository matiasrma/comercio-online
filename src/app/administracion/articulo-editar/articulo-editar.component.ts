import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloModel } from 'src/app/models/ArticuloModel';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-articulo-editar',
  templateUrl: './articulo-editar.component.html',
  styleUrls: ['./articulo-editar.component.scss']
})
export class ArticuloEditarComponent implements OnInit {

  @Input() listaArticulos: ArticuloModel[] = [];

  respuesta: string = "";

  constructor(
    private ArticulosService: ArticuloService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.ObtenerArticulos();
  }

  async ObtenerArticulos(){
    await this.ArticulosService.getListaArticulos().then(data => this.listaArticulos = data);
  }

  async GuardarArticulo(articulo: ArticuloModel){
    await this.ArticulosService.setArticulo(articulo).then(data => this.respuesta = data);
  }

}
