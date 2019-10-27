export interface Roles {
  client?: boolean;
  admin?: boolean;
  superadmin?: boolean;
}

export class UsuarioModel{
  id:string;
  email: string;
  password: string;
  RFC:string;
  negocio:string;
  numero:string;
  telefono:string;
  tipo:string;
  roles: Roles;
}

export interface UserInterface {
  id:string;
  email: string;
  roles: Roles;

}
