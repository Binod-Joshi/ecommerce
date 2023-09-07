import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle",
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    response: null,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        authRequest: (state) =>{
            state.loading = true;
            state.status = "loading";
        },
        authSuccess:(state,action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
            state.status = "success";
        },
        authFailed:(state,action) => {
            state.loading = false;
            state.status = "failed";
            state.response = action.payload;
        },
        authError:(state,action) => {
            state.loading = false;
            state.status = "error";
            state.error = action.payload;
        }
    }
});

export const {authRequest, authSuccess, authError, authFailed} = userSlice.actions;

export const userReducer = userSlice.reducer;