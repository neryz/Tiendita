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
import * as moment from 'moment'
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  // array con nombre vacantes de
  usuarios: UsuarioModel [] = [];
  constructor(private servicioUsuarios: UsuarioService, private router: Router, private afs: AngularFirestore) {}

  getUsuarios (){
    this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
      this.usuarios = respuesta;
    });
  }
      // public isUserAdmin: any = null;
      // public isSuperAdmin: any = null;
      // public userUid: string = null;

  //     getCurrentSuperAdmin(){
  //       console.log('recupero mi usuario');
  //       this.servicioUsuarios.isAuth().subscribe(auth => {
  //         if (auth){
  //           this.userUid = auth.uid;
  //           this.servicioUsuarios.isSuperAdmin(this.userUid).subscribe(userRole => {
  //             this.isSuperAdmin = Object.assign({}, userRole.roles).hasOwnProperty('superadmin');
  //             this.isSuperAdmin = true;
  //           })
  //         }
  //       })
  //     }
  //
  // getCurrentUser(){
  //   console.log('recupero mi usuario');
  //   this.servicioUsuarios.isAuth().subscribe(auth => {
  //     if (auth){
  //       this.userUid = auth.uid;
  //       this.servicioUsuarios.isUserAdmin(this.userUid).subscribe(userRole => {
  //         this.isUserAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
  //         // this.isUserAdmin = true;
  //       })
  //     }
  //   })
  // }
   onLogout(): void {

     Swal.fire({
       title: '¿Está seguro en cerrar sesión?',
       type: 'warning',
       showCancelButton: true,
       cancelButtonColor: '#3085d6',
       confirmButtonColor: '#d33 ',
       confirmButtonText: 'Salir'
     }) .then((result) =>  {

       if (result.value) {
         this.router.navigateByUrl('/login');
         Swal.fire(
           'Ha cerrado sesión correctamente'
         )
       }
     });
  }
  ngOnInit() {
    this.getUsuarios();
    // this.getCurrentUser();
    // this.getCurrentSuperAdmin();

  }

}
