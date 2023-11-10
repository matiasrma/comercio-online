import { Component, OnInit } from '@angular/core';
import { DolarModel } from 'src/app/models/DolarModels';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  cotizacion: number = 0;
  cotizacionOnline: number = 0;
  actualizacionOnline: boolean = true;
  dolar: DolarModel = {} as DolarModel;  

  constructor(
    private DolarService: DolarService,
  ){}

  ngOnInit(): void {
    this.obtenerCotizacion();        
  }  

  async obtenerCotizacion(){
    let actualizacion = localStorage.getItem("actualizacionOnline");
    this.actualizacionOnline = actualizacion === 'true';
    console.log(this.actualizacionOnline);
    
    this.obtenerCotizacionManual();
    await this.obtenerCotizacionOnline();
  }

  cambioActualizacion(){
    this.actualizacionOnline = !this.actualizacionOnline;
  }

  obtenerCotizacionManual(){
    let usd = localStorage.getItem("cotizacion");
    if (usd != undefined) this.cotizacion = parseInt(usd);
  }

  async obtenerCotizacionOnline(){
    
    try {
      await this.DolarService.obtenerCotizacion().then(data => this.dolar = data);      
      this.cotizacionOnline = this.dolar.compra;
      console.log(this.dolar);      
    } catch(e: any) {
      console.log(e);      
    }    
  }

  guardarCotizacion(){
    localStorage.setItem("cotizacion", this.cotizacion.toString());
    localStorage.setItem("actualizacionOnline", this.actualizacionOnline.toString());    
  }

  
}
