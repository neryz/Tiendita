import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UsuarioService} from 'src/app/services/usuarios.service';
import {UsuarioModel} from 'src/app/models/usuario.model';
import { FormControl } from '@angular/forms';
import {AngularFireAuth} from "@angular/fire/auth";
import {VacantesService} from 'src/app/services/vacantes.service';
import {VacanteModel} from 'src/app/models/vacantes.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoria: UsuarioModel = new UsuarioModel();
  usuarios: UsuarioModel [] = [];
  negocios = [];
  categorias = ['MISCELANEA'];
  // user: UserInterface;
  vacante: VacanteModel = new VacanteModel();
  // array con nombre vacantes de
  vacantes: VacanteModel [] = [];
  constructor(private servicioUsuarios: UsuarioService, private servicioVacantes: VacantesService, private router: Router) {}
  getUsuarios (){
    this.servicioUsuarios.getUsuarios().subscribe(respuesta => {
      console.log(respuesta);
      this.usuarios = respuesta;
    });
  }
  getVacantes (){
    this.servicioVacantes.getVacantes().subscribe(respuesta => {
      console.log(respuesta);
      this.vacantes = respuesta;
    });
  }
  verUsuario (usuario: any){
    this.categoria = usuario;
  }
  ngOnInit() {
    this.getUsuarios();
    this.getVacantes();
  }
  // negocioCategoria(negocio: string){
  //   this.negocios = this.servicioUsuarios.getCategoria(negocio);
  // }
  onSelect(event) {
    let query = null;
    if (event.value == "Tipo")
      query = this.servicioUsuarios.getUsuarios();
      else
      query = this.servicioUsuarios.getCategoriasFilter(event.value);

      query.subscribe(categoria => {
        this.negocios = categoria
      })
  }
}
