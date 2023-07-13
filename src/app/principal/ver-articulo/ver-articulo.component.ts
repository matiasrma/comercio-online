import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloModel } from 'src/app/models/ArticuloModel';
import { DolarModel } from 'src/app/models/DolarModels';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'app-ver-articulo',
  templateUrl: './ver-articulo.component.html',
  styleUrls: ['./ver-articulo.component.scss'],
})
export class VerArticuloComponent implements OnInit {

  @ViewChild('carousel', { read: NgbCarousel, static: true })
  public Carousel!: NgbCarousel;

  articulo: ArticuloModel = {} as ArticuloModel;
  cotizacion: number = 0;
  dolar: DolarModel[] = [];  
  actualizacionOnline: boolean = true;

  constructor(
    private DolarService: DolarService,
    private articuloService: ArticuloService,
    private _activatedRoute: ActivatedRoute
    ) {
      _activatedRoute.queryParamMap.subscribe( params => {
        this.articulo.codigo = params.get('codigo')!;
      });
  }

  ngOnInit(): void {
    this.getArticulo();
  }

  async getArticulo(){
    await this.obtenerCotizacion();
    this.articulo = this.articuloService.getArticulo(this.articulo.codigo);
    this.articulo.precio *= this.cotizacion;
  }

  async obtenerCotizacion(){
    let actualizacion = localStorage.getItem("actualizacionOnline");
    this.actualizacionOnline = actualizacion == 'true';
    if (this.actualizacionOnline || actualizacion == undefined){
      await this.obtenerCotizacionOnline();
    } else {
      await this.obtenerCotizacionManual();
    }
  }

  obtenerCotizacionManual(){
    let usd = localStorage.getItem("cotizacion");
    if (usd != undefined) this.cotizacion = parseInt(usd);
    if (usd == undefined) this.cotizacion = 450;
  }

  async obtenerCotizacionOnline(){
    
    try {
      await this.DolarService.obtenerCotizacion().then(data => this.dolar = data);
      let indexBlue = this.dolar.findIndex(dlr => dlr.nombre == 'Blue');
      this.cotizacion = this.dolar[indexBlue].compra;
      console.log(this.cotizacion);    
    } catch(e: any) {
      console.log(e);
      this.obtenerCotizacionManual();
    }    
  }

  eligirImagen(i: number){
    this.Carousel.select(`ngb-slide-${i}`);
  }

}
