import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../types/TypesShortLink";
import {AppThunk} from "./index";
import {ShortLinkClient} from "../api/ShortLinkClient";

interface LoginState {
    user: IUser | null
    isAuth: boolean
    errorMessage: string | null
}

const initialState: LoginState = {
    user: null,
    isAuth: false,
    errorMessage: null
};
export const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            initApp: (state) => {
                let token = localStorage.getItem("token")
                if(token) {
                    state.isAuth = true
                }
            },
            setUser: (state, action: PayloadAction<boolean>) => {
                state.isAuth = action.payload
            },
            setError: (state, action: PayloadAction <string | null>) => {
                state.errorMessage = action.payload
            },
        }
    }
)

export const {
    initApp,
    setUser,
    setError
} = authSlice.actions


export const signUpAsync = (username: string,  password: string): AppThunk => async  (dispatch: any) => {
        await ShortLinkClient.signUp(username,  password)
}
export const removeUserAsync = (): AppThunk => async  (dispatch: any) => {
        localStorage.removeItem("token")
        dispatch(setUser(false))
}
export const loginAsync = (username: string,  password: string): AppThunk => async  (dispatch: any) => {
        let result = await ShortLinkClient.auth(username,  password)
        localStorage.setItem("token", result.access_token)
        dispatch(setUser(true))
}

export default authSlice.reducer;