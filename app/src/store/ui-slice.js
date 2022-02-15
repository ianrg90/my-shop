import { createSlice } from "@reduxjs/toolkit";

const initialUiState = { loading: null, status: null, message: null };

const uiSlice = createSlice({
    name: "ui",
    initialState: initialUiState,
    reducers: {
        changeUiState(state, action){
            state.loading = action.payload.loading
            state.status = action.payload.status
            state.message = action.payload.message
        }
    }
});

export default uiSlice.reducer
export const uiActions = uiSlice.actions
