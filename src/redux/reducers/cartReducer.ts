import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType, ProductInCart } from "../../types/cart";

const initialState: CartType = {
    myCart: []
};

const cartSlice = createSlice({
    name: 'cartReducer',
    initialState: initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<ProductInCart>) => {
            const productIndex = state.myCart.findIndex(
                product => product.id === action.payload.id
            )
            if (productIndex >= 0) {
                state.myCart[productIndex].quantity += 1
            } else {
                state.myCart.push({
                    ...action.payload, quantity: action.payload.quantity
                })
            }
        },
        removeUnitProductFromCart: (state, action: PayloadAction<ProductInCart>) => {
            const productIndex = state.myCart.findIndex(
                product => product.id === action.payload.id
            )
            if (state.myCart[productIndex].quantity > 1) {
                state.myCart[productIndex].quantity --
            } 
            
        },
        removeProductFromCart: (state, action: PayloadAction<ProductInCart>) => {
            state.myCart = state.myCart.filter(product => product.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {

    }
})

export const { addProductToCart, removeUnitProductFromCart, removeProductFromCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer