import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map, switchMap } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { isNullOrUndefined } from "util";
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
      private url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
      private apiKey = 'AIzaSyDH-yFDRl3SGfnudO9fIR86n7zxIRHXLQU';

  constructor(private http: HttpClient, private router: Router, private afs: AngularFirestore, public afsAuth: AngularFireAuth) {

  }

  login (usuario: UsuarioModel){ console.log(usuario);
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    console.log(`${this.url}verifyPassword?Key=${this.apiKey}`);

    return this.http.post(
          `${ this.url }verifyPassword?key=${ this.apiKey }`,
          authData
        )
        .pipe(
          map( data => data)
        );
  }
  //

  private guardarToken (idToken: string){}

}
// login https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
