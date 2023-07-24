import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { FormsModule } from '@angular/forms';
import { VerArticuloComponent } from './ver-articulo/ver-articulo.component';
import { NgbCarouselModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


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
    PrincipalRoutingModule,
    NgbCarouselModule,
    NgbToastModule
  ]
})
export class PrincipalModule { }
