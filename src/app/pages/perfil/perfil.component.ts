import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  usuarios: UsuarioModel [] = [];
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private servicioUsuarios: UsuarioService, private router: Router) { }
  getUsuarios (){
    this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
      console.log(respuesta);
      this.usuarios = respuesta;
    });
  }
  editarUsuarios (usuario: UsuarioModel){
    console.log('Voy a editar a:  ')
    this.servicioUsuarios.editarUsuarios( usuario );
  }
  verUsuario (usuario: any){
    this.usuario = usuario;
  }
  ngOnInit() {
    this.getUsuarios();
  }

}
