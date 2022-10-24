import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, FetchProductsParams, updateProductType, ProductReducerStateType, CreateProductType } from "../../types/products";

const initialState: ProductReducerStateType = {
    productList: [],
    product: <Product>{}
}

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async ({ offset, limit }: FetchProductsParams) => {
        try {
            const data = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            const result = await data.json()
            return result
        } catch (error: any) {
            console.log("Error in fetchProducts:: ", error)
        }
    }
)

export const deleteProductASync = createAsyncThunk(
    'deleteProduct',
    async (productId: string) => {
        try {
            const data = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, { method: 'DELETE' })
            return productId
        } catch (error: any) {
            console.log("Error in deleteProduct:: ", error)
        }
    }
)

export const addNewProductAsync = createAsyncThunk(
    'addNewProduct',
    async (newProduct: CreateProductType) => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.log("Error in addNewProduct::", error)
        }
    }
)

export const updateProductAsync = createAsyncThunk(
    'updateProduct',
    async (updateThisProduct: updateProductType) => {
        try {
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products/${updateThisProduct.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(updateThisProduct.updatePackage),
                }
            )
            const data = await response.json()
            return data
        } catch (error) {
            console.log("Error in updateProductAsync:: ", error)
        }
    }
)

const productSlice = createSlice({
    name: 'productReducer',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.productList = action.payload
            })
            .addCase(deleteProductASync.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                state.productList = state.productList.filter(product => product.id !== action.payload)
            })
            .addCase(addNewProductAsync.fulfilled, (state, action: PayloadAction<CreateProductType>) => {
                state.productList.push(action.payload)
            })
            .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<updateProductType>) => {
                state.productList.filter(product => {
                    if(product.id === action.payload.id){
                        product = {
                            ...product,
                            ...action.payload.updatePackage
                        }
                    }
                })
            })
    }
})

export const productReducer = productSlice.reducer
// export const { addProduct, updateProduct } = productSlice.actions

