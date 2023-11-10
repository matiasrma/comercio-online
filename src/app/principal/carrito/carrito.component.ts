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
  
  cotizacion: number = 0;
  dolar: DolarModel = {} as DolarModel;  
  actualizacionOnline: boolean = true;

  carrito: CarritoModel[] = [];  
  listaArticulos: ArticuloModel[] = [];
  totalFinal: number = 0;
  
  constructor(
    private DolarService: DolarService,
    private articuloService: ArticuloService    
    ) {
      
  }

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  async getArticulos(){
    await this.obtenerCotizacion();
    this.carrito.forEach(async element => {
      let articulo = await this.articuloService.getArticulo(element.codigo);
      articulo.precioPesos = articulo.precioUSD * this.cotizacion;
      this.listaArticulos.push(articulo);
      this.totalFinal += articulo.precioPesos * element.cantidad;            
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
      this.cotizacion = this.dolar.compra;
      console.log(this.cotizacion);    
    } catch(e: any) {
      console.log(e);
      this.obtenerCotizacionManual();
    }    
  }

  async guardarCarrito(codigo: string, cantidad: number){
    let indexCarrito = this.carrito.findIndex(element => element.codigo == codigo);
    this.carrito[indexCarrito].cantidad += cantidad;
    console.log(this.carrito[indexCarrito]);
    
    let articulo = await this.articuloService.getArticulo(codigo);
    articulo.stock -= cantidad;
    console.log(articulo);
    
    localStorage.setItem("Carrito", JSON.stringify(this.carrito));
    await this.articuloService.setStock(codigo, articulo.stock);
    console.log(cantidad)
  }

  async obtenerCarrito(){
    let carritoStorage = localStorage.getItem("Carrito");
    if (carritoStorage) { 
      console.log(carritoStorage);      
      this.carrito = JSON.parse(carritoStorage);    
      await this.ajustarStock();
      await this.getArticulos();      
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
