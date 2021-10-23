import { Autor, Editorial, IItem } from './item.interface';
import { Usuario } from '../models/usuario.model';
export interface Comprobante {

    monto?: number;
    productos?: IItem[];
    usuario?: string;
    
    

}
