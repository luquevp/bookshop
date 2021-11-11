import { Role } from './usuario.interface';

export interface AuthResponse {
    ok?: boolean,
    token?: string,
    usuario: {
        msg?: string,
        nombre?: string,
        uid?: string,
        email?: string,
        rol?: Role,
        provincia?: string,
        localidad?: string,
        direccion?: string,
        codigoPostal?: number,
        celular?: number
    }
}

export interface RecuperarPass {

    ok?: boolean,
    msg?: string,
    codigo?: string,


}


export interface Recup {
    destinatario: string;

}

export interface Recup2 {
    codigo: string;
    email: string;


}


