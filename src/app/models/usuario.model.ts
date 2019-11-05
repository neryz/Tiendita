export interface Roles {
  client?: boolean;
  admin?: boolean;
  superadmin?: boolean;
}

export class UsuarioModel{
  id:string;
  email: string;
  negocio:string;
  password: string;
  descripcion: string;
  anuncio: string;
  ubicacion: string;
  empleo: string;
  tiempo: string;
  requisitos: string;
  rfc:string;
  numero:string;
  telefono:string;
  tipo:string;
  roles: string;
}

export interface UserInterface {
  email: string;
  password: string;

}
