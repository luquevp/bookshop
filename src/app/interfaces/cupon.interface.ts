export interface Cupon {

    ok?: boolean,
    cupon?: {
        _id?: string,
        nombre?: string,
        codigo?: string,
        usos?: number,
        valor?: number,
        porcentaje?: number,
        tipo?: string,
        usuario?: string
    }

}