import { Injectable } from '@angular/core';
import { VacanteModel } from '../models/vacantes.model';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private prodCollection: AngularFirestoreCollection<any>;
  private vacantes: Observable<any[]>;

  vacDoc: AngularFirestoreDocument<any>;
  Vacante: Observable<any>;

  public selected: any = {
    id: null
  };
  private url = 'https://tiendita-92412.firebaseio.com/';

  constructor( private afs: AngularFirestore ) {

    this.prodCollection = afs.collection<any>('vacantes');
    this.vacantes = this.prodCollection.valueChanges();

  }

  crearVacante(vacante: VacanteModel) {
    this.prodCollection.add({...vacante}).then( resp => {
    });
    console.log(vacante);
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
  editarVacantes (vacante: VacanteModel){
    const idvacante = vacante.id;
    this.vacDoc = this.afs.doc<any>(`vacantes/${idvacante}`);
    this.vacDoc.update(vacante).then( resp => {
    });
    console.log(vacante);
  }
  eliminarVacantes (idvacante: VacanteModel) {
    this.vacDoc = this.afs.doc<any>(`vacantes/${idvacante.id}`);
    this.vacDoc.delete();
    console.log();
  }
}

// ////////////////////////////////////////////////////
