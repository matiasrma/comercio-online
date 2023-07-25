import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionComponent } from './administracion.component';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { ArticuloEditarComponent } from './articulo-editar/articulo-editar.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AdministracionComponent,
    InicioComponent,
    ArticuloEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministracionRoutingModule,
    NgbCarouselModule
  ]
})
export class AdministracionModule { }
