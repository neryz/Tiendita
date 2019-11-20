import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {LoginService} from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { isError } from 'util';
import { map, switchMap } from 'rxjs/operators';
import {UsuarioModel} from 'src/app/models/usuario.model';
import {UserInterface} from 'src/app/models/usuario.model';
import { AngularFireAuth } from '@angular/fire/auth';


import { isNullOrUndefined } from "util";
import { Observable, BehaviorSubject, combineLatest} from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // items$: Observable<any[]>;
  // emailFilter$: BehaviorSubject<string|null>;

  usuario: UsuarioModel = new UsuarioModel();
  usuarios: UsuarioModel [] = [];

  constructor(private auth: AuthService, private servicioUsuarios: UsuarioService, private servicioLogin: LoginService, private router: Router, private afs: AngularFirestore) {
    // this.emailFilter$ = new BehaviorSubject(null);
    // this.usuarios = combineLatest(
    //   this.emailFilter$,
    // ).pipe(
    //   switchMap((email) =>
    //     this.afs.collection('items', ref => {
    //       let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
    //       if (email) { query = query.where('email', '==', email) };
    //       return query;
    //     }).valueChanges()
    //   )
    // );
  }

  // private usuario: UsuarioModel;

  public isError = false;

  //
  //
  //   onLogin(form: NgForm) {
  //   if (form.valid) {
  //     return this.auth
  //       .loginusuario(this.usuario)
  //       .subscribe(
  //       data => {
  //         console.log(data.usuario);
  //         this.auth.setUser(data.usuario);
  //         const token = data.id;
  //         this.auth.setToken(token);
  //         // this.router.navigateByUrl('/perfil');
  //         // location.reload();
  //         // this.isError = false;
  //       },
  //       error => this.onIsError()
  //       );
  //   } else {
  //     this.onIsError();
  //   }
  //   if (form.invalid) {return;} console.log(this.usuario);
  // }



    // filterBySize(usuario: string|null) {
    //   this.emailFilter$.next(usuario);
    // }
    // // filterByColor(usuario: string|null) {
    //   this.passwordFilter$.next(usuario);
    // }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  // Esto es una nueva forma de login
  ngOnInit() {
    this.servicioUsuarios.getUsuarios().subscribe( (usuarios) => {
      console.log('obtenidos->', usuarios)
      this.usuarios = usuarios;
    });
    // this.servicioLogin.getUser().subscribe((usuarioSnapshot) => {
    //   this.usuarios = [];
    //   usuarioSnapshot.forEach((usuario: UsuarioModel) => {
    //     this.usuarios.push({
    //       email: usuario.payload.doc.email,
    //     });
    //   })
    // });
  }

  nuevoLogin(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: 'El usuario y/o contraseña, son incorrectos',
        text: "Una vez eliminado el usuario, no podrás recuperarlo",
        type: 'warning',
      });
    }
    if (form.invalid) {return;} console.log(this.usuario);
    let existe = false;
    for(let i = 0; i < this.usuarios.length; i++){
      if( this.usuarios[i].email === this.usuario.email ) {
        console.log('encontrado');
        this.usuario = this.usuarios[i];
        existe= true;
        break;
      }
    }

    if(existe){
      console.log('mandamos a otra pagina');
      localStorage.setItem ('usuario', JSON.stringify(this.usuario) );
      this.router.navigateByUrl('/perfil');
      this.servicioUsuarios.setUser(this.usuario);
      const token = this.usuario.id;
      this.servicioUsuarios.setToken(token);
      const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
           })

        Toast.fire({
          type: 'success',
          title: 'Ha ingresado correctamente'
        })
    } else {
      console.log('mandamos un mensaje para verificar los datos');
    }

  }

}
