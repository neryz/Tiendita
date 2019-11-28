import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {VacantesService} from 'src/app/services/vacantes.service';
import {UsuarioService} from 'src/app/services/usuarios.service';

import {VacanteModel} from 'src/app/models/vacantes.model';
import {UsuarioModel} from 'src/app/models/usuario.model';
// import { UserInterface } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {
  // user: UserInterface;
  vacante: VacanteModel = new VacanteModel();
  // array con nombre vacantes de
  vacantes: VacanteModel [] = [];
  usuarios: UsuarioModel [] = [];
// constructor para poder mandar peticiones
  constructor(private servicioVacantes: VacantesService, private servicioUsuarios: UsuarioService, private router: Router) {
  }
// crearVacante -> es una funcion en donde le indico que mandaré datos al crearVacante de la funcion servicioVacantes
    crearVacante( vacante: VacanteModel ){
      this.servicioVacantes.crearVacante( vacante );
    }
    getVacantes (){
      this.servicioVacantes.getVacantes().subscribe(respuesta => {
        console.log(respuesta);
        this.vacantes = respuesta;
      });
    }
    editarVacantes (vacante: VacanteModel){
      this.servicioVacantes.editarVacantes( vacante );
    }
    eliminarVacantes (vacantes: VacanteModel){
      this.servicioVacantes.eliminarVacantes;
    }
    // This -> es una variable global de mi clase
    // termina
  ngOnInit() {
     this.getVacantes();
  }

}
