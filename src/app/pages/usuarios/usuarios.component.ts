import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import {UserInterface} from 'src/app/models/usuario.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import  {User} from 'src/app/shared/user.class';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  filterUsuario= '';
  usuario: UsuarioModel = new UsuarioModel();
  // array con nombre vacantes de
  usuarios: UsuarioModel [] = [];
  negocios = [];
  userAuth: User = new User();
  // constructor para poder mandar peticiones
  constructor(private servicioUsuarios: UsuarioService, private router: Router, private afs: AngularFirestore) {}
      public isUserAdmin: any = null;
      public isSuperAdmin: any = null;
      public userUid: string = null;
  // crearVacante -> es una funcion en donde le indico que mandaré datos al crearVacante de la funcion servicioVacantes
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

  crearUsuario( usuario: UsuarioModel ){
    this.servicioUsuarios.crearUsuario( usuario );

    Swal.fire({
      title: 'Agregado!',
      text: 'El proceso se ha realizado con éxito',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }
 //    onAddUser() {
 //   this.servicioUsuarios.registerUser(this.email, this.password).catch(err => console.log('err', err.message));
 // }
     async onRegister(){
       console.log('entrada a registrer');
       const usuario = await this.servicioUsuarios.onRegister(this.usuario);
       if (usuario) {
           console.log('Successfully created user');
       }
     }
    getUsuarios (){
      this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
        console.log(respuesta);
        this.usuarios = respuesta;
      });
    }

    // getCurrentUser(){
    //   console.log('recupero mi usuario');
    //   this.servicioUsuarios.isAuth().subscribe(auth => {
    //     if (auth){
    //       this.userUid = auth.uid;
    //       this.servicioUsuarios.isUserAdmin(this.userUid).subscribe(userRole => {
    //         this.isUserAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
    //       })
    //     }
    //   })
    // }

    // getCurrentSuperAdmin(){
    //   console.log('recupero mi usuario');
    //   this.servicioUsuarios.isAuth().subscribe(auth => {
    //     if (auth){
    //       this.userUid = auth.uid;
    //       this.servicioUsuarios.isSuperAdmin(this.userUid).subscribe(userRole => {
    //         this.isSuperAdmin = Object.assign({}, userRole.roles).hasOwnProperty('superadmin');
    //         this.isSuperAdmin = true;
    //       })
    //     }
    //   })
    // }
    verUsuario (usuario: any){
      this.usuario = usuario;
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

    showModalEditar(){
      Swal.fire({
        title: 'Agregado!',
        text: 'Espere la visita de alguien que necesite del empleo',
        type: 'success',
        confirmButtonText: 'Cool'
      });
    }
    // eliminarUsuarios (usuario: UsuarioModel){
    //   this.servicioUsuarios.eliminarUsuarios(usuario);
    // }
    // This -> es una variable global de mi clase
    // termina
  ngOnInit() {
    this.getUsuarios();
    // this.getCurrentSuperAdmin();
    // this.getCurrentUser();
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
