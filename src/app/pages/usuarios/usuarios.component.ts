import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  user:any;
  usuario: UsuarioModel = new UsuarioModel();
  // array con nombre vacantes de
  usuarios: UsuarioModel [] = [];
  filterUsuario='';
  negocios = [];
  // constructor para poder mandar peticiones
  constructor(private servicioUsuarios: UsuarioService, private router: Router) {}
  // crearVacante -> es una funcion en donde le indico que mandaré datos al crearVacante de la funcion servicioVacantes
    crearUsuario( usuario: UsuarioModel ){
      this.servicioUsuarios.crearUsuario( usuario );
    }
    getUsuarios (){
      this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
        console.log(respuesta);
        this.usuarios = respuesta;
      });
    }
    verUsuario (usuario: any){
      this.usuario = usuario;
    }
    editarUsuarios (usuario: UsuarioModel){
      console.log('Voy a editar a:  ')
      this.servicioUsuarios.editarUsuarios( usuario );
    }
    eliminarUsuarios (usuario: UsuarioModel){
      this.servicioUsuarios.eliminarUsuarios(usuario);
    }
    // This -> es una variable global de mi clase
    // termina
  ngOnInit() {
    this.getUsuarios();
  }
  onSelect(event) {
    let query = null;
    if (event.value == "Tipo")
      query = this.servicioUsuarios.getUsuarios();
      else
      query = this.servicioUsuarios.getUsuariosFiltro(event.value);

      query.subscribe(negocio => {
        this.negocios = negocio
      })
  }


}
