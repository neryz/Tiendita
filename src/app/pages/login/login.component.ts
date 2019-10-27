import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import {UsuarioModel} from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) { console.log(this.usuario);}

  login (form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: '¿Está seguro de eliminar el usuario?',
        text: "Una vez eliminado el usuario, no podrás recuperarlo",
        type: 'warning',
      });
    }

    if (form.invalid) {return;} console.log(this.usuario);
    this.auth.login(this.usuario)
    .subscribe((resp)=> {console.log(resp);
      // if (this.recordarme) {
      //   localStorage.setItem ('email', this.usuario['email']);
      // }
      this.router.navigateByUrl('/perfil');
      const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        })

        Toast.fire({
          type: 'success',
          title: 'Ha ingresado correctamente'
        })
    });
  }
  ngOnInit() {
  }

}
