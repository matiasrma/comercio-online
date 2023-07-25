import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from "./principal.component";
import { InicioComponent } from "./inicio/inicio.component";
import { VerArticuloComponent } from "./ver-articulo/ver-articulo.component";
import { CarritoComponent } from "./carrito/carrito.component";


const routes: Routes = [
    { path: '', component: PrincipalComponent, 
        children: [
            { path: 'Inicio', component: InicioComponent, data: { text: 'Inicio' } },
            { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
            { path: 'VerProducto', component: VerArticuloComponent, data: { text: 'VerProducto' } },            
            { path: 'Carrito', component: CarritoComponent, data: { text: 'VerCarrito' } },            
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrincipalRoutingModule{

}