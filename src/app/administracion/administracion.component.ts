import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioModel } from "../models/UsuarioModel";
import { LoginService } from "../services/login.service";


@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit{

    usuario: UsuarioModel = {} as UsuarioModel;

    constructor(
        private LoginService: LoginService,
        private router: Router
    ){

    }

    ngOnInit(): void {
    }

    irAPrincipal(){
        this.router.navigate(['Principal/']);
    }

    login() {
        let loginOK = this.LoginService.Login(this.usuario.usuario, this.usuario.contrasenia);
        
        if (loginOK){
            this.router.navigate([]);
        }
    }

    

}