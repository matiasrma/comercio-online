import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FormsModule } from '@angular/forms';
import { VerArticuloComponent } from './ver-articulo/ver-articulo.component';



@NgModule({
  declarations: [
    PrincipalComponent,
    InicioComponent,
    ArticuloComponent,
    VerArticuloComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
