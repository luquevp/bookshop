import { Autor, Editorial, IItem } from './item.interface';
export interface Comprobante {


    numero?: number;
    fecha?: Date;
    productos?: IItem[];
    estado?: boolean;
    monto?: number;
    usuario?: string;
    cupon?: number;
    _id?: number;



}

export interface ComprobanteConDetalle {

    ok?: boolean;
    comprobante?: {
        numero?: number;
        fecha?: Date;
        detalleComprobante?: {
            _id?: number;
            productos?: IItem[];
            estado?: boolean;


        }
        monto?: number;
        usuario?: string;
        cupon?: number;
        _id?: number;
    }



}

export interface Detalle {

    ok?: boolean,
    detComprobante?: {
        _id?: number;
        productos?: IItem[];
        estado?: boolean;

    }

}
