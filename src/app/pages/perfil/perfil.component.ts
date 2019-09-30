import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
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

  eliminarUsuarios(usuario: UsuarioModel){
    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      text: "Una vez eliminado el usuario, no podrás recuperarlo",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33 ',
      confirmButtonText: 'Eliminar'
    }) .then((result) =>  {

      if (result.value) {
        this.servicioUsuarios.eliminarUsuarios(usuario);
        Swal.fire(
          'Eliminado satisfactoriamente!',
          'El usuario ha sido eliminado',
          'success'
        )
      }
    });
  }
  
  editarUsuarios (usuario: UsuarioModel){
    console.log('Voy a editar a:  ')
    this.servicioUsuarios.editarUsuarios( usuario );

    Swal.fire({
      title: 'Editado!',
      text: 'Los cambios se guardaron correctamente',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }
  
  verUsuario (usuario: any){
    this.usuario = usuario;
  }

  
  crearUsuario( usuario: UsuarioModel ){
    this.servicioUsuarios.crearUsuario( usuario );
    Swal.fire({
      title: 'Agregado!',
      text: 'El proceso se ha realizado con éxito',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

 

  ngOnInit() {
    this.getUsuarios();
  }

}
