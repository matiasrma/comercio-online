import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioModel } from "../models/UsuarioModel";
import { LoginService } from "../services/login.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{
  
    usuario: UsuarioModel = {usuario: "admin", contrasenia: "admin987"} as UsuarioModel;
    respuesta: string = "";
    session: boolean = false;

    constructor(
        private LoginService: LoginService,
        private modalService: NgbModal,
        private router: Router
    ){

    }

    ngOnInit(): void {
        this.getSession();
    }

    irAPrincipal(){
        this.router.navigate(['Principal/']);
    }

    getSession(){
        let sessionStorage = localStorage.getItem("SessionComercio");
        if (sessionStorage){
            this.session = sessionStorage == 'true';
        }
    }

    login() {
        let loginOK = this.LoginService.Login(this.usuario.usuario, this.usuario.contrasenia);
        this.respuesta = "Ingresando"
        if (loginOK){       
            //this.router.navigate(['Administracion']);
            this.session = true;
            localStorage.setItem("SessionComercio", 'true')
            this.modalService.dismissAll();
        } else {
            this.respuesta = "Error de login";
        }

    }

    loguot(){
        this.session = false;
        localStorage.removeItem("SessionComercio");
        console.log(this.session)
    }

    open(content: any){
        this.modalService.open(content);
    }

}