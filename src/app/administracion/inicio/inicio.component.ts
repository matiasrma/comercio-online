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
  dolar: DolarModel[] = [];  

  constructor(
    private DolarService: DolarService,
  ){}

  ngOnInit(): void {
    this.obtenerCotizacion();        
  }  

  async obtenerCotizacion(){
    let actualizacion = localStorage.getItem("actualizacionOnline");
    this.actualizacionOnline = actualizacion == 'true';
    
    this.obtenerCotizacionManual();
    await this.obtenerCotizacionOnline();
  }

  obtenerCotizacionManual(){
    let usd = localStorage.getItem("cotizacion");
    if (usd != undefined) this.cotizacion = parseInt(usd);
  }

  async obtenerCotizacionOnline(){
    
    try {
      await this.DolarService.obtenerCotizacion().then(data => this.dolar = data);
      let indexBlue = this.dolar.findIndex(usd => usd.nombre == 'Blue');
      this.cotizacionOnline = this.dolar[indexBlue].compra;
    } catch(e: any) {
      console.log(e);      
    }    
  }

  guardarCotizacion(){
    localStorage.setItem("cotizacion", this.cotizacion.toString());
    localStorage.setItem("actualizacionOnline", this.actualizacionOnline.toString());    
  }

  
}
