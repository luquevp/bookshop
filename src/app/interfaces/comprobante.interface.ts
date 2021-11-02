import { Autor, Editorial, IItem } from './item.interface';
export interface Comprobante {

    total?: number;
    subTotal?: number;
    descuento?: number;
    numero?: number;
    fecha?: Date;
    productos?: IItem[];
    estado?: boolean;
    usuario?: string;
    cuponId?: string;
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
        //monto?: number;
        subTotal?:number;
        descuento?:number;
        total?:number
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
