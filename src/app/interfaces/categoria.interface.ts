export interface Categoria {

    _id?: number,
    nombre?: string,

}

export interface SubCategoria {

    _id?: number,
    nombre?: string,
    categoria?: Categoria,

}
