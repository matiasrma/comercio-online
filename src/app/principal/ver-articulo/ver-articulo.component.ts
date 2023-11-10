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
  showToastCarrito: boolean = false;

  articulo: ArticuloModel = {} as ArticuloModel;
  cotizacion: number = 0;
  dolar: DolarModel = {} as DolarModel;  
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
  }

  async getArticulo(){
    await this.obtenerCotizacion();
    await this.articuloService.getArticulo(this.articulo.codigo).then(data => this.articulo = data);
    this.articulo.precioPesos = this.articulo.precioUSD * this.cotizacion;
    this.obtenerCarrito();
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
      this.cotizacion = this.dolar.compra;      
      console.log(this.cotizacion);    
    } catch(e: any) {
      console.log(e);
      this.obtenerCotizacionManual();
    }    
  }

  eligirImagen(i: number){
    this.Carousel.select(`slideId_${i}`);       
  }

  async agregarAlCarrito(){
    let nuevo: CarritoModel = {
      codigo: this.articulo.codigo,
      cantidad: 1
    };

    let indexCodigo = this.carrito.findIndex(element => element.codigo == nuevo.codigo);

    if (indexCodigo >= 0){
      this.carrito[indexCodigo].cantidad += 1;
    } else {
      this.carrito.push(nuevo);
    }
    
    this.guardarCarrito();    
    this.articulo.stock -= 1;
    await this.articuloService.setStock(this.articulo.codigo, this.articulo.stock);

    this.mensajeCarrito = "Ariticulo agregado al carrito!";  
    this.showToastCarrito = true;
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
      this.showToastCarrito = true;
      this.ajustarStock();
    }
  }

  async ajustarStock(){
    if (!this.articuloService.getActualizado()){
      let listaArticulos = await this.articuloService.getListaArticulos();      
      this.carrito.forEach(async element => {        
        let index = listaArticulos.findIndex(articulo => articulo.codigo == element.codigo );
        listaArticulos[index].stock -= element.cantidad;
        await this.articuloService.setStock(element.codigo, listaArticulos[index].stock);
      })      
    }    
  }

}
