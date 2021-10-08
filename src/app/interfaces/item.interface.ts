import { Usuario } from '../models/usuario.model';
export interface IItem {


    _id?: number,
    titulo: string,
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
    quantity?: number,
    autor?: Autor,
    editorial?: Editorial


}

export interface Autor {

    _id?: number,
    nombre?: string

}


export interface Editorial {

    _id?: number,
    nombre?: string

}