import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloModel } from 'src/app/models/ArticuloModel';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent {

  @Input() listaArticulos: ArticuloModel[] = [];

  constructor(
      private router: Router
    ) {}

  verProducto(codigo: string){
    this.router.navigate(['/Principal/VerProducto'],
    { queryParams: { codigo: codigo } }
    )
  }

}
