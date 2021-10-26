import { Usuario } from './usuario.interface';
export interface Evento {

    _id?: number;
    nombre?: string;
    descripcion?: string;
    lugar?: string;
    usuario?: Usuario;
    img?: string;

}