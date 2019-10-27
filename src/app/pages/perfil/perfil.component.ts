import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import {NoticiasModel} from 'src/app/models/noticias.model';
import {VacantesService} from 'src/app/services/vacantes.service';
import {VacanteModel} from 'src/app/models/vacantes.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  // modelos para los usuarios
  usuarios: UsuarioModel [] = [];
  usuario: UsuarioModel = new UsuarioModel();
  // modelos para las noticias
  noticias: NoticiasModel [] = [];
  noticia: NoticiasModel = new NoticiasModel();
  public active = true;

  vacante: VacanteModel = new VacanteModel();
  // array con nombre vacantes de
  vacantes: VacanteModel [] = [];
// constructor para poder mandar peticiones

  constructor(private servicioUsuarios: UsuarioService, private router: Router, private servicioVacantes: VacantesService) { }

  getNoticias (){
    this.servicioUsuarios.getNoticias().subscribe(respuesta => {
      console.log(respuesta);
      this.noticias = respuesta;
    });
  }

  getVacantes (){
    this.servicioVacantes.getVacantes().subscribe(respuesta => {
      console.log(respuesta);
      this.vacantes = respuesta;
    });
  }

  crearVacante(vacante: VacanteModel){
    console.log('Voy a crear al vacante: ');
    this.servicioVacantes.crearVacante( vacante );
    Swal.fire({
      title: 'Vacante creada!',
      text: 'Ahora tu vacante ya esta publicada',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

    crearNoticias( noticia: NoticiasModel ){
      this.servicioUsuarios.crearNoticias( noticia );
      Swal.fire({
        title: 'Agregado!',
        text: 'El proceso se ha realizado con éxito',
        type: 'success',
        confirmButtonText: 'OK'
      });
    }


  eliminarNoticia(noticia: NoticiasModel){
    Swal.fire({
      title: '¿Está seguro de eliminar la noticias?',
      text: "Una vez eliminado la noticia, no podrás recuperarlo",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33 ',
      confirmButtonText: 'Eliminar'
    }) .then((result) =>  {

      if (result.value) {
        this.servicioUsuarios.eliminarNoticia(noticia);
        Swal.fire(
          'Eliminado satisfactoriamente!',
          'La noticia ha sido eliminado',
          'success'
        )
      }
    });
  }

  eliminarVacantes (vacantes: VacanteModel){
    Swal.fire({
      title: '¿Está seguro de eliminar la noticias?',
      text: "Una vez eliminado la noticia, no podrás recuperarlo",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33 ',
      confirmButtonText: 'Eliminar'
    }) .then((result) =>  {

      if (result.value) {
        this.servicioVacantes.eliminarVacantes(vacantes);
        Swal.fire(
          'Eliminado satisfactoriamente!',
          'La noticia ha sido eliminado',
          'success'
        )
      }
    });
  }

  editarVacantes (vacante: VacanteModel){
    console.log('Voy a editar a:  ')
    this.servicioVacantes.editarVacantes( vacante );

    Swal.fire({
      title: 'Editado!',
      text: 'Los cambios se guardaron correctamente',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

  editarNoticia (noticia: NoticiasModel){
    this.servicioUsuarios.editarNoticia( noticia );
    Swal.fire({
      title: 'Editado!',
      text: 'Los cambios se guardaron correctamente',
      type: 'success',
      confirmButtonText: 'OK'
    });
  }

  verNoticia (noticia: any){
    this.noticia = noticia;
  }

  verVacante ( vacante: any){
    this.vacante = vacante;
  }

  // Seccion de VacantesService


  // limpiar(usuario: UsuarioModel) {
  //     this.servicioUsuarios = {''};
  //     this.active = false;
  //     setTimeout(() => this.active = true, 0);
  //   }



  ngOnInit() {
    this.getNoticias();
    this.getVacantes();
  }

}
