import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    token: null,
    expiresIn:null,
    id:null,
    email: null
}

const authSlice = createSlice({
    name: "authentication",
    initialState: authInitialState,
    reducers: {
        setAuthData(state, action){
            state.token = action.payload.authData.idToken
            state.expiresIn = action.payload.authData.expiresIn
            state.email = action.payload.authData.email
            state.id = action.payload.authData.localId
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions