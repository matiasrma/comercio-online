import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbPopover, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloModel } from 'src/app/models/ArticuloModel';
import { CarritoModel } from 'src/app/models/CarritoModel';
import { DolarModel } from 'src/app/models/DolarModels';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  
  articulo: ArticuloModel = {} as ArticuloModel;
  cotizacion: number = 0;
  dolar: DolarModel[] = [];  
  actualizacionOnline: boolean = true;

  carrito: CarritoModel[] = [];  
  listaArticulos: ArticuloModel[] = [];
  totalFinal: number = 0;
  
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
    this.obtenerCarrito();
  }

  async getArticulos(){
    await this.obtenerCotizacion();
    this.carrito.forEach(element => {
      this.articulo = this.articuloService.getArticulo(element.codigo);
      this.articulo.precioPesos = this.articulo.precioUSD * this.cotizacion;
      this.listaArticulos.push(this.articulo);
      this.totalFinal += this.articulo.precioPesos * element.cantidad;
    })
    
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

  guardarCarrito(){
    localStorage.setItem("Carrito", JSON.stringify(this.carrito));
  }

  obtenerCarrito(){
    let carritoStorage = localStorage.getItem("Carrito");
    if (carritoStorage) { 
      console.log(carritoStorage);      
      this.carrito = JSON.parse(carritoStorage);    
      this.getArticulos();
    }

  }

}
