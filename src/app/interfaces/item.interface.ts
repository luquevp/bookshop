import { Usuario } from '../models/usuario.model';
export interface IItem {


    _id?: number,
    titulo?: string,
    descripcion?: string,
    isbn?: number,
    formato?: String,
    img?: String,
    idioma?: String,
    edicion?: String,
    anoPublicacion?: Date,
    usuario?: Usuario,
    estado?: Boolean,
    precio?: number,
    cantidad?: number,
    autor?: Autor,
    editorial?: Editorial,
    stock?: number;

    

}

export interface CartItemModel {

    _id?: number;
    titulo?: string;
    precio?: number;
    cantidad?: number;

}



export interface Autor {

    _id?: number,
    nombre?: string,
    libro?: IItem; 

}


export interface Editorial {

    _id?: number,
    nombre?: string

}