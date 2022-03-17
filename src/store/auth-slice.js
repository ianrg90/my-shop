import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    token: null,
    uuid:null,
}

const authSlice = createSlice({
    name: "authentication",
    initialState: authInitialState,
    reducers: {
        setAuthData(state, action){
            state.token = action.payload.authData.idToken
            state.uuid = action.payload.authData.localId
        }
    }
})

export default authSlice.reducer
export const authActions = authSlice.actions