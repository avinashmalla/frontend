import { Product } from "./products";

export interface ProductInCart extends Product{
    quantity: number
}

export interface CartType {
    myCart: ProductInCart[] 
}

// itemsInCart: number
//     grandTotal: number