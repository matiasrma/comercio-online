import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ArticuloModel } from 'src/app/models/ArticuloModel';
import { CarritoModel } from 'src/app/models/CarritoModel';
import { DolarModel } from 'src/app/models/DolarModels';
import { ArticuloService } from 'src/app/services/articulo.service';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit{

  @ViewChild('toastPrimero', { read: NgbToast, static: true })
  public toastPrimero!: NgbToast;

  @ViewChild('toastCarrito', { read: NgbToast, static: true})
  public toastCarrito!: NgbToast;
  showToastCarrito: boolean = true;

  listaArticulos: ArticuloModel[] = [];

  cotizacion:number = 0;
  dolar: DolarModel[] = [];
  actualizacionOnline: boolean = true;

  carrito: CarritoModel[] = [];

  constructor(
    private ArticulosService: ArticuloService,
    private DolarService: DolarService,
  ){  }

  ngOnInit(){
    this.getListaArticulos();    
    this.toastPrimero.hide();
    this.obtenerCarrito();
  }

  async getListaArticulos(){    
    await this.obtenerCotizacion();
    this.listaArticulos = [];
    await this.ArticulosService.getListaArticulos().then( data => {
      this.listaArticulos = data;
      this.listaArticulos.forEach(element =>{
        element.precioPesos = element.precioUSD * this.cotizacion;
      });    
    });
    
  }

  bannerClick(){
    
  }

  async obtenerCotizacion(){
    let actualizacion = localStorage.getItem("actualizacionOnline");
    this.actualizacionOnline = actualizacion == 'true';
    console.log(actualizacion);
    console.log(this.actualizacionOnline);
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
    console.log(this.cotizacion);    
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

  hideToast(){
    this.toastPrimero.hide();
  }

  obtenerCarrito(){
    let carritoStorage = localStorage.getItem("Carrito");
    if (carritoStorage) { 
      console.log(carritoStorage);      
      this.carrito = JSON.parse(carritoStorage);          
      this.showToastCarrito = true;
    }
  }

}
