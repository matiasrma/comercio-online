import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'Principal', pathMatch: 'full'},
  { path: 'Principal', loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule) },
  { path: 'Administracion', loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
