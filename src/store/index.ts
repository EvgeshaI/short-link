import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authReducer from "./authSlice";
import contentReducer from "./contentSlice";

export const store = configureStore( {
    reducer: {
        authReducer: authReducer,
        contentReducer: contentReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, RootState, any, Action<string>>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;