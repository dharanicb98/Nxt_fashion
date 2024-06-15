import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStyles: false,
  styles: "",
  backgroundColor: "#59665c" 
};

export const navberChange = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    noStyles: (state) => {
      state.isStyles = false;
      state.styles = "text-white";
      state.backgroundColor = "#59665c"; 
    },
    applyStyles: (state, action) => {
      state.isStyles = true;
      state.styles = action.payload.styles;
      state.backgroundColor = action.payload.backgroundColor; 
    },
  },
});

export const { noStyles, applyStyles } = navberChange.actions;
export default navberChange.reducer;
