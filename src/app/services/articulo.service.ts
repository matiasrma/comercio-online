import { Injectable } from '@angular/core';
import { ArticuloModel } from '../models/ArticuloModel';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private lista: ArticuloModel[] = [
    { 
      codigo: "Cod-1",
      precioUSD: 100,
      precioPesos: 0,
      nombre: 'Smartband Amazfit GTR 4 1.43", malla racetrack grey y bisel negro',
      descripcion: 'Pantalla táctil AMOLED de 1.43". Apto para descarga de aplicaciones. Reproduce audio. Resiste hasta 50m bajo el agua. Con GPS y mapas integrados. Batería con carga rápida. Conectividad por Bluetooth y wifi. Capacidad de la memoria interna de 2GB. Sensores incluidos: acelerómetro, giroscopio.La duración de la batería depende del uso que se le dé al producto.',
      imagenes: ["../../../assets/reloj1-1.webp", "../../../assets/reloj1-2.webp", "../../../assets/reloj1-3.webp"],
      stock: 4
     },
     { 
      codigo: "Cod-3",
      precioUSD: 150,
      precioPesos: 0,
      nombre: 'Smart Watch Zl02d Reloj Inteligente Para Samsung Xiaomi Y +',
      descripcion: 'Pantalla táctil AMOLED de 1.43". Apto para descarga de aplicaciones. Reproduce audio. Resiste hasta 50m bajo el agua. Con GPS y mapas integrados. Batería con carga rápida. Conectividad por Bluetooth y wifi. Capacidad de la memoria interna de 2GB. Sensores incluidos: acelerómetro, giroscopio.La duración de la batería depende del uso que se le dé al producto.',
      imagenes: ["../../../assets/2-1.webp", "../../../assets/2-2.webp", "../../../assets/2-3.webp"],
      stock:2
     }
  ];
  

  constructor() { }

  async getListaArticulos(): Promise<ArticuloModel[]>{
    
    return this.lista;
  }

  getArticulo(codigo: string): ArticuloModel{

    let index = this.lista.findIndex(prod => prod.codigo == codigo);

    return this.lista[index];
  }

  async setArticulo(articulo: ArticuloModel): Promise<string>{

    let index = this.lista.findIndex(prod => prod.codigo == articulo.codigo);

    this.lista[index] = articulo;

    return "Se guardo Correctamente"
  }

}
