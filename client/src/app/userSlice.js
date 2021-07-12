import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isBuyer: false,
    isAdmin: false,
    user:{},
    isLoading: false, 
    isLoggedIn: false,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginPending: (state) => {
            state.isLoading = true
        },
        getUser: (state,action) =>{
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        }, 
        isABuyer: (state,action) =>{
            state.isBuyer = action.payload;
            state.isDealer = false
            state.isAdmin = false
        },
        isAAdmin: (state,action) =>{
            state.isBuyer = false
            state.isDealer = false
            state.isAdmin = action.payload
        },
        getLogout: (state,action) =>{
            state.user = {};
            state.isLoggedIn = false;
            state.isLoading = false;
        }
    },
    extraReducers:{}
})

const {actions,reducer} = userSlice;

export const {getUser,isAAdmin,isABuyer,loginPending,getLogout} = actions;

export default reducer;