import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { ComponentesModule} from './componentes/componentes.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContrasenniaComponent } from './componentes/contrasennia/contrasennia.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { VacantesComponent } from './pages/vacantes/vacantes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    VacantesComponent,
    UsuariosComponent,
    AgregarComponent,
    ContrasenniaComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
