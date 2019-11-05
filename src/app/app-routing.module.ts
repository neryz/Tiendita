import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {PerfilComponent} from './pages/perfil/perfil.component';
import {UsuariosComponent} from './pages/usuarios/usuarios.component';
import {VacantesComponent} from './pages/vacantes/vacantes.component';
import {AgregarComponent} from './pages/agregar/agregar.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'home',component: HomeComponent, canActivate: [AuthGuard]},
  {path:'perfil',component: PerfilComponent, canActivate: [AuthGuard]},
  {path:'usuarios',component: UsuariosComponent, canActivate: [AuthGuard]},
  {path:'vacantes',component: VacantesComponent, canActivate: [AuthGuard]},
  {path:'agregar',component: AgregarComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch:'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
