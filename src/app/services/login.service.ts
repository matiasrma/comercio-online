import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  Login(usuario: string, contrasenia: string): boolean {

    return usuario == "admin" && contrasenia == "admin987"

  }

}
