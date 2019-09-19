import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {PerfilComponent} from './pages/perfil/perfil.component';
import {UsuariosComponent} from './pages/usuarios/usuarios.component';
import {VacantesComponent} from './pages/vacantes/vacantes.component';
import {AgregarComponent} from './pages/agregar/agregar.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'perfil',component: PerfilComponent},
  {path:'usuarios',component: UsuariosComponent},
  {path:'vacantes',component: VacantesComponent},
  {path:'agregar',component: AgregarComponent},
  {path: '**', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
