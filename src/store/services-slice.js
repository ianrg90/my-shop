import { createSlice } from "@reduxjs/toolkit";

const initialServiceState = {
    servicesList: []
}

const serviceSlice = createSlice({
    name: "services",
    initialState: initialServiceState,
    reducers: {
        populateServicesList(state, action){
            state.servicesList = action.payload.servicesData
        }
    }
})

export default serviceSlice.reducer
export const serviceActions = serviceSlice.actions