import { Product } from "./products"

export interface CategoryType{
    id: number,
    name: string,
    image: string
}

export interface CategoryReducerType{
    categories : CategoryType[],
    productList : Product[]
}