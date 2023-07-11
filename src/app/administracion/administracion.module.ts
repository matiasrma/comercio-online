import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [
    AdministracionComponent,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
