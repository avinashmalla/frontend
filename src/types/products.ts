import { CategoryType } from "./category";

export interface Product{
    id: string,
    title: string,
    price: number,
    description: string,
    category: CategoryType,
    images: string[]
}

export interface updateProductType extends Partial<Product>{
    id: string,
    updatePackage: {
        title: string,
        price: number,
        description: string
    }
}

export interface FetchProductsParams{
    offset: number,
    limit: number
}

export interface ProductReducerStateType{
    productList: Product[],
    product: Product
}

export interface CreateProductType extends Product{
    title: string,
    price: number,
    description: string,
    category: CategoryType,
    images: string[]
}