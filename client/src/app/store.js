import {configureStore } from '@reduxjs/toolkit'
import tokenReducer from "./tokenSlice"
import userReducer from './userSlice'


const store = configureStore({
    reducer: {
        token: tokenReducer,
        user : userReducer,
    },
})

export default store;