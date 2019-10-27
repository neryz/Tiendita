import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
      private url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
      private apiKey = 'AIzaSyDH-yFDRl3SGfnudO9fIR86n7zxIRHXLQU';

  constructor(private http: HttpClient, private router: Router, private firestore: AngularFirestore) {}
  public currentUser: any;
    public userStatus: string;
    public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);


    setUserStatus(userStatus: any): void {
      this.userStatus = userStatus;
      this.userStatusChanges.next(userStatus);
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
        ).pipe(
          map( resp => {
            return resp;
          })
        );
  }

  private guardarToken (idToken: string){}

}
// login https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]
