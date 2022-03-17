import { createSlice } from "@reduxjs/toolkit";

const initialQuoteListState = {
    quoteList: []
}

const quoteSlice = createSlice({
    name: "quotes",
    initialState: initialQuoteListState,
    reducers: {
        getQuoteList(state, action){
            state.quoteList = action.payload.quoteData
        }
    }
})

export default quoteSlice.reducer
export const quoteActions = quoteSlice.actions