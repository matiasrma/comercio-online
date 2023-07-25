export interface ArticuloModel{
    codigo: string,
    precioUSD: number,
    precioPesos: number,
    nombre: string,
    descripcion: string,
    imagenes: string[],
    stock: number
}