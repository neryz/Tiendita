import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UserInterface } from 'src/app/models/usuario.model';
import {UsuarioService} from 'src/app/services/usuarios.service';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private servicioUsuarios: UsuarioService, private router: Router, private afs: AngularFirestore) {}
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
    // this.getCurrentUser();
    // this.getCurrentSuperAdmin();

  }

}
