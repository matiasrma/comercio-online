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
    session: boolean = false;

    constructor(
        private LoginService: LoginService,
        private router: Router
    ){

    }

    ngOnInit(): void {
        this.getSession();        
    }

    irAPrincipal(){
        this.router.navigate(['Principal/']);
    }

    loguot(){
        this.session = false;
        localStorage.removeItem("SessionComercio");
        console.log(this.session);
        this.router.navigate([''])
    }

    getSession(){
        let sessionStorage = localStorage.getItem("SessionComercio");
        if (sessionStorage){
            this.session = sessionStorage == 'true';
        }
        console.log(sessionStorage);
        console.log(this.session);
        
    }

    

}