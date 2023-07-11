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

    constructor(
        private LoginService: LoginService,
        private modalService: NgbModal,
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
        this.respuesta = "Ingresando"
        if (loginOK){       
            this.router.navigate(['Administracion']);
            this.modalService.dismissAll();
        } else {
            this.respuesta = "Error de login";
        }

    }

    open(content: any){
        this.modalService.open(content);
    }

}