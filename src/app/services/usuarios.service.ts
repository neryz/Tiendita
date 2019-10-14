import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { VacanteModel } from '../models/vacantes.model';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private prodCollection: AngularFirestoreCollection<any>;
  private usuarios: Observable<any[]>;

  usDoc: AngularFirestoreDocument<any>;
  usuario: Observable<any>;

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);


  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  vacDoc: AngularFirestoreDocument<any>;
  Vacante: Observable<any>;

  public selected: any = {
    id: null
  };
  private url = 'https://tiendita-92412.firebaseio.com/';

  constructor( private afs: AngularFirestore, private afsAuth: AngularFireAuth, private router: Router) {

    this.prodCollection = afs.collection<any>('Usuarios');
    this.usuarios = this.prodCollection.valueChanges();

  }


  agregar(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass).catch(err => console.log(reject(err)))
    });
  }

    crearUsuario(usuario: UsuarioModel){

      this.prodCollection.add({...usuario}).then( resp => {
      });
      console.log(usuario)
    }

  getUsuarios (){
    return this.usuario = this.prodCollection.snapshotChanges()
    .pipe( map( cambios => {
      return cambios.map( accion => {
        const data = accion.payload.doc.data() as any;
        data.id = accion.payload.doc.id;
        return data;
      });
    }));
    console.log();
  }

  getVacantes (){
    return this.Vacante = this.prodCollection.snapshotChanges()
    .pipe( map( cambios => {
      return cambios.map( accion => {
        const data = accion.payload.doc.data() as any;
        data.id = accion.payload.doc.id;
        return data;
      });
    }));
    console.log();
  }
  // despues de los dos puntos se declara un objeto o como tambien podria hacerse una asignacion

  editarUsuarios (usuario: UsuarioModel){
    const idusuario = usuario.id;
    this.usDoc = this.afs.doc<any>(`Usuarios/${idusuario}`);
    this.usDoc.update(usuario).then( resp => {
    });
    console.log(usuario);
  }
  eliminarUsuarios (idusuario: UsuarioModel) {
    this.usDoc = this.afs.doc<any>(`Usuarios/${idusuario.id}`);
    this.usDoc.delete();
    console.log();

  }
  getCategoriasFilter(filtro: string){
    this.usDoc = this.afs.doc<any>(`/Usuarios`),{
      query: {
        orderByChild: 'tipo',
        equalTo: filtro
      }
    }
    return this.usDoc;
  }

  getUsuariosFiltro (filtro: string){
    this.usDoc = this.afs.doc<any>(`/Usuarios`),{
      query: {
        orderByChild: 'negocio',
        equalTo: filtro
      }
    }
    return this.usDoc;
  }

  // getCategoria(negocio: string){
  //   let categorias = this.getUsuarios();
  //   let categoria = categorias.filter( item => item.negocio == negocio)
  //   return categoria;
  // }

  // private updateUserData(usuario) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuario.id}`);
  //   const data: UserInterface = {
  //     id: usuario.id,
  //     email: usuario.email,
  //     roles:{
  //       client: true,
  //       admin: false,
  //       superadmin: false
  //     }
  //   }
  //   return userRef.set(data, { merge: true })
  // }
  // isUserAdmin(userid) {
  // return this.afs.doc<UserInterface>(`Usuarios/${userid}`).valueChanges();
  // }

}
