import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateUserType, LoginType, PartialLoginType, User, UserReducerStateType } from "../../types/user";

const initialState: UserReducerStateType = {
    userList: [],
    currentUser: undefined
}

export const fetchAllUsers = createAsyncThunk(
    'fetchAllUsers',
    async (user: User) => {
        if (user.role === 'admin') {
            const response = await axios.get<User[]>('https://api.escuelajs.co/api/v1/users')
            console.log("how long", response.data.length)
            return response.data
        } else {
            return []
        }
    }
)

export const fetchSingleUser = createAsyncThunk(
    'fetchSingleUser',
    async (searchUser: string) => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/users')
            const userObj = response.data
            return userObj.filter((user: { name: User["name"] }) => user.name.includes(searchUser))
        } catch (error) {
            console.log(error)
        }
    }
)

export const createUserAsync = createAsyncThunk(
    'createUserAsync',
    async (pkg: CreateUserType) => {
        const currentUser = pkg.currentUser
        const newUser = pkg.createPackage
        if (currentUser.role === 'admin') {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
                const userData = await response.json()
                return userData
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("Administrative rights required to create new user")
            return "Administrative rights required to create new user"
        }

    }
)

export const loginAsync = createAsyncThunk(
    'loginAsync',
    async ({ email, password }: LoginType) => {
        try {
            const sessUser = { email, password }
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email, password
            })
            if (response.data.access_token) {
                if (!localStorage.getItem(`sessUser`)) {
                    console.log("UserReducer :: Token not found, Adding it")
                    localStorage.setItem(`sessUser`, response.data.access_token)
                }
                const user = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
                })
                console.log("from loginAsync: ", user.data)
                return user.data
            } else {
                console.log("from loginAsync: Undefined")
                return undefined
            }
        } catch (error) {
            console.log(error)
        }

    }
)

export const loginByToken = createAsyncThunk(
    'loginByToken',
    async (token: string) => {
        const user = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("from loginByToken: ", user.data)
        return user.data
    }
)


const userSlice = createSlice({
    name: 'userReducer',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.currentUser = initialState.currentUser
            // localStorage.removeItem(`sessUser`)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.userList = action.payload
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(loginByToken.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.userList = action.payload
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.userList.push(action.payload)
            })
    }
})

export const { logOut } = userSlice.actions
export const userReducer = userSlice.reducer
