import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CategoryReducerType } from "../../types/category"

const initialState: CategoryReducerType = {
    categories: [],
    productList: [],
  }

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async() => {
        try {
            const data = await fetch(`https://api.escuelajs.co/api/v1/categories`)
            const result = await data.json()
            return result
        } catch (error) {
            console.log("Error in fetchCategories:: ", error)
        }
    }
)

export const fetchProductsByCategory = createAsyncThunk(
    'fetchProductsByCategory',
    async(categoryId: number|string|undefined) => { 
        try {
            const data = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
            const result = await data.json()
            return result
        } catch (error) {
            console.log("Error in fetchSingleCategory:: ", error)
        }
    }
)


const categorySlice = createSlice({
    name: 'categoryReducer',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.productList = action.payload
            })
    },
})

export const categoryReducer = categorySlice.reducer