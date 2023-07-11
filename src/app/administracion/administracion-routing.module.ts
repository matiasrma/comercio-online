import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministracionComponent } from "./administracion.component";
import { InicioComponent } from "./inicio/inicio.component";


const routes: Routes = [
    { path: '', component: AdministracionComponent, 
        children: [
            { path: 'Inicio', component: InicioComponent, data: { text: 'Inicio' } },
            { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionRoutingModule{

}