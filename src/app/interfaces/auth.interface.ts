import { Role } from './usuario.interface';

export interface AuthResponse {
    ok?: true,
    token?: string,
    usuario: {
        msg?: string,
        nombre?: string,
        uid?: string,
        email?: string,
        rol?: Role
    }
}