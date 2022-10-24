import { configureStore } from "@reduxjs/toolkit"
import {productReducer} from './reducers/productReducer'
import { cartReducer } from "./reducers/cartReducer"
import { userReducer } from "./reducers/userReducer"
import { categoryReducer } from "./reducers/categoryReducer"

export const store = configureStore({
    reducer: {
        productReducer,
        cartReducer,
        userReducer,
        categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
