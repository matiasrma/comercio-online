import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbPopover, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloModel } from 'src/app/models/ArticuloModel';
import { CarritoModel } from 'src/app/models/CarritoModel';
import { DolarModel } from 'src/app/models/DolarModels';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'app-ver-articulo',
  templateUrl: './ver-articulo.component.html',
  styleUrls: ['./ver-articulo.component.scss'],
})
export class VerArticuloComponent implements OnInit {

  @ViewChild('carousel')
  public Carousel: NgbCarousel = {} as NgbCarousel;

  @ViewChild('toastCarrito', { read: NgbToast, static: true})
  public toastCarrito!: NgbToast;

  articulo: ArticuloModel = {} as ArticuloModel;
  cotizacion: number = 0;
  dolar: DolarModel[] = [];  
  actualizacionOnline: boolean = true;

  carrito: CarritoModel[] = [];
  mensajeCarrito: string = "";
  
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
    //this.toastCarrito.hide();
    this.obtenerCarrito();
  }

  async getArticulo(){
    await this.obtenerCotizacion();
    this.articulo = this.articuloService.getArticulo(this.articulo.codigo);
    this.articulo.precioPesos = this.articulo.precioUSD * this.cotizacion;
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
    this.Carousel.select(`slideId_${i}`);       
  }

  agregarAlCarrito(){
    this.carrito.push({
      codigo: this.articulo.codigo,
      cantidad: 1
    });
    this.guardarCarrito();
    this.mensajeCarrito = "Ariticulo agregado al carrito!";  
  }

  guardarCarrito(){
    localStorage.setItem("Carrito", JSON.stringify(this.carrito));
  }

  obtenerCarrito(){
    let carritoStorage = localStorage.getItem("Carrito");
    if (carritoStorage) { 
      console.log(carritoStorage);      
      this.carrito = JSON.parse(carritoStorage);    
      this.mensajeCarrito = "Tienes articulos en el carrito!";  
    }
  }

}
