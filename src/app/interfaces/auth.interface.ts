import { Role } from './usuario.interface';

export interface AuthResponse {
    ok?: true,
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