import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NoticiasModel } from '../models/noticias.model';
import { UserInterface } from '../models/usuario.model';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { VacanteModel } from '../models/vacantes.model';
import {Router} from "@angular/router";
import { User } from '../shared/user.class';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private prodCollection: AngularFirestoreCollection<any>;
  private usuarios: Observable<any[]>;

  private notCollection: AngularFirestoreCollection<any>;
  private noticias: Observable<any[]>;

  usDoc: AngularFirestoreDocument<any>;
  usuario: Observable<any>;

  notDoc: AngularFirestoreDocument<any>;
  noticia: Observable<any>;

  vacDoc: AngularFirestoreDocument<any>;
  Vacante: Observable<any>;

  public selected: any = {
    id: null
  };

  user: UsuarioModel;
  private url = 'https://tiendita-92412.firebaseio.com/';

  constructor( private afs: AngularFirestore, public afsAuth: AngularFireAuth, private router: Router) {

    this.prodCollection = afs.collection<any>('Usuarios');
    this.usuarios = this.prodCollection.valueChanges();

    this.notCollection = afs.collection<any>('noticias');
    this.noticias = this.prodCollection.valueChanges();

  }

  // registerUser(email: string, pass: string) {
  //     return new Promise((resolve, reject) => {
  //       this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
  //     });
  //   }

    async onRegister (usuario: UsuarioModel){
      try {
        return new Promise((resolve, reject) => {
          this.afsAuth.auth.createUserWithEmailAndPassword(
            usuario.email,
            usuario.password,
          ).then(userData => {
            resolve(userData),
            this.updateUserData(userData.user)
          })
        });
      }catch (error){
        console.log('Error on registrer user', error);
      }
    }

    crearUsuario(usuario: UsuarioModel){
      this.prodCollection.add({...usuario}).then( resp => {
      });
      console.log(usuario)
    }

    crearNoticias(noticia: NoticiasModel){

      this.notCollection.add({...noticia}).then( resp => {
      });
      console.log(noticia)
    }

    private updateUserData (user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        roles: {
          admin: true
        }
      }
      return userRef.set(data, {merge: true})
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

  getNoticias (){
    return this.noticia = this.notCollection.snapshotChanges()
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

  editarNoticia (noticia: NoticiasModel){
    const idnoticia = noticia.id;
    this.notDoc = this.afs.doc<any>(`noticias/${idnoticia}`);
    this.notDoc.update(noticia).then( resp => {
    });
    console.log(noticia);
  }

  eliminarUsuarios (idusuario: UsuarioModel) {
    this.usDoc = this.afs.doc<any>(`Usuarios/${idusuario.id}`);
    this.usDoc.delete();
    console.log();

  }

  eliminarNoticia (idnoticia: NoticiasModel) {
    this.notDoc = this.afs.doc<any>(`noticias/${idnoticia.id}`);
    this.notDoc.delete();
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
  isUserAdmin (userUid){
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
  isAuth() {
      return this.afsAuth.authState.pipe(map(auth => auth));
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
