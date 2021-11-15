export interface Usuario {

    ok: boolean,
    uid?:string,
    nombre: string,
    email: string,
    password: string,
    img: string,
    rol: Role,
    estado: boolean,
    google: boolean,
    provincia: string,
    codigoPostal?: number,
    localidad: string,
    celular?: number,
    direccion: string

}

export enum Role {
    USER_ROLE = "USER_ROLE",
    ADMIN_ROLE = "ADMIN_ROLE"
}

export enum TiposBuscador {

    f = 'f',
}

// export interface AuthResponse {
//     ok: boolean;
//     uid?: string;
//     name?: string;
//     email?: string;
//     token?: string;
//     msg?: string;
// }

// export interface Usuario {

//     ok?: boolean,
//     uid?:string,
//     nombre?: string,
//     email?: string,
//     password?: string,
//     img?: string,
//     rol?: Role,
//     estado?: boolean,
//     google?: boolean,
//     provincia?: string,
//     localidad?: string,
//     direccion?: string,
//     codigoPostal?: number,
//     celular?: number


// }

// export enum Role {
//     USER_ROLE = "USER_ROLE",
//     ADMIN_ROLE = "ADMIN_ROLE"
// }