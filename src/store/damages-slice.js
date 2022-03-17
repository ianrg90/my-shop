import { createSlice } from "@reduxjs/toolkit";

const initialDamageState = { damages: [] };

const damageSlice = createSlice({
  name: "damages",
  initialState: initialDamageState,
  reducers: {
    getDamages(state, action) {
      const perspective = action.payload.perspective;
      const area = action.payload.area;

      const indexToReplace = state.damages.findIndex(
        (damage) => damage.perspective === perspective && damage.area === area
      );
      if (indexToReplace === -1) {
        state.damages.push(action.payload);
      } else {
        
        state.damages[indexToReplace] = action.payload;
      }
    },

    clearDamages(state){
      state.damages = []
    }
  },
});

export default damageSlice.reducer;
export const damageActions = damageSlice.actions;
