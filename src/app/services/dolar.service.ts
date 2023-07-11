import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DolarModel } from '../models/DolarModels';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolarService {

  url: string = "https://dolar-api-argentina.vercel.app/v1/dolares";

  respuesta: any = null;

  constructor(
    private http: HttpClient
  ) { }

  async obtenerCotizacion(): Promise<DolarModel[]> {

    const data$ = this.http.get<DolarModel>(this.url, { params: { responseType: 'json' } });

    try {
      const value = await lastValueFrom(data$, { defaultValue: 'false' } ) ?? 'false';
      this.respuesta = value;
    } catch (e: any) {
      this.respuesta = e.error;
    }
    
    return this.respuesta;

  }
}
