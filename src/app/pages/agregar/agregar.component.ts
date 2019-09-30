import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {VacantesService} from 'src/app/services/vacantes.service';
import {VacanteModel} from 'src/app/models/vacantes.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  vacante: VacanteModel = new VacanteModel();
  // array con nombre vacantes de
  vacantes: VacanteModel [] = [];
// constructor para poder mandar peticiones
  constructor(private servicioVacantes: VacantesService, private router: Router) {
  }
// crearVacante -> es una funcion en donde le indico que mandaré datos al crearVacante de la funcion servicioVacantes
    crearVacante( vacante: VacanteModel ){
      console.log('Voy a crear al vacante: ');
      this.servicioVacantes.crearVacante( vacante );
      Swal.fire({
        title: 'Vacante creada!',
        text: 'Ahora tu vacante ya esta publicada',
        type: 'success',
        confirmButtonText: 'OK'
      });
    }
    // getVacantes (){
    //   this.servicioVacantes.getVacantes().subscribe(respuesta => {
    //     console.log(respuesta);
    //     this.vacantes = respuesta;
    //   });
    // }
    // editarVacantes (vacante: VacanteModel){
    //   this.servicioVacantes.editarVacantes( vacante );
    // }
    // eliminarVacantes (vacantes: VacanteModel){
    //   this.servicioVacantes.eliminarVacantes;
    // }
    // This -> es una variable global de mi clase
    // termina
  ngOnInit() {
     // this.getVacantes();
     // this.crearVacante();
  }

}

// /////////////////////////////////////////////////////
