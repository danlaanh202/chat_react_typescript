import { createSlice } from "@reduxjs/toolkit";

const themeReducer = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
  },
});
export const { toggleDarkMode } = themeReducer.actions;
export default themeReducer.reducer;
