export interface Roles {
  client: boolean;
  admin: boolean;
  superadmin: boolean;
}

export class UsuarioModel{
  id:string;
  userUid: string;
  email: string;
  password: string;
    RFC:string;
    negocio:string;
  numero:string;
  telefono:number;
  tipo:string;
  Email:string;
  contraseña:string;
  opciones:string;
}
