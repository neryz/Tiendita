import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map, switchMap } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { isNullOrUndefined } from "util";
import { Observable, BehaviorSubject, combineLatest} from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // items$: Observable<any[]>;
  // emailFilter$: BehaviorSubject<string>;
  // passwordFilter$: BehaviorSubject<string>;
  constructor(private http: HttpClient, private router: Router, private afs: AngularFirestore, public afsAuth: AngularFireAuth) {
        //
        // this.emailFilter$ = new BehaviorSubject(null);
        // this.passwordFilter$ = new BehaviorSubject(null);
        // this.items$ = combineLatest(
        //   this.emailFilter$,
        //   this.passwordFilter$
        // ).pipe(
        //   switchMap((size, color) =>
        //     this.afs.collection('items', ref => {
        //       let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        //       if (size) { query = query.where('size', '==', size) };
        //       if (color) { query = query.where('color', '==', color) };
        //       return query;
        //     }).valueChanges()
        //   )
        // );
      }

  setUser(user: UsuarioModel){
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getUserGuard(): UsuarioModel {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let usuario: UsuarioModel = JSON.parse(user_string);
      return usuario;
    } else {
      return null;
    }
  }

  //Obtiene un usuario
public getUser(documentId: string) {
  return this.afs.collection('Usuarios').doc(documentId).snapshotChanges();
}




  isAuth() {
      return this.afsAuth.authState.pipe(map(auth => auth));
    }

}

// loginuser(usuario: UsuarioModel): Observable<any> {
//   console.log(usuario);
//   // const authData = {
//   //     email: usuario.email,
//   //     password: usuario.password,
//   //     returnSecureToken: true
//   //   };
//   //
//   console.log();
//
//  console.log(`${this.url}verifyPassword?Key=${this.apiKey}`);
// return this.http
//   .post<UsuarioModel>(
//     // this.prodCollection = this.afs.collection<any>('Usuarios'),
//     `${ this.url }verifyPassword?key=${ this.apiKey }`,
//   { headers: this.headers }
// ).pipe(
//   switchMap((usuario) =>
//     this.afs.collection('Usuarios', ref => {
//       let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
//       if (usuario) { query = query.where('email', '==', usuario.email)};
//       return query;
//     }).valueChanges()
// )
// );
//
// console.log(usuario);
// }
//
// getUsuario (emailusuario: UsuarioModel){
// this.usDoc = this.afs.doc<any>(`users/${emailusuario.email}`);
// console.log(emailusuario);
// }
//
