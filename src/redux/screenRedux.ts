import { createSlice } from "@reduxjs/toolkit";
export interface IScreen {
  sidebar: Boolean;
  main: Boolean;
  profile: Boolean;
}
const screenSlice = createSlice({
  name: "screen",
  initialState: {
    sidebar: true,
    main: false,
    profile: false,
  },
  reducers: {
    showSidebar: (state) => {
      state.sidebar = true;
      state.main = false;
      state.profile = false;
    },
    showMain: (state) => {
      state.sidebar = false;
      state.main = true;
      state.profile = false;
    },
    showProfile: (state) => {
      state.sidebar = false;
      state.main = false;
      state.profile = true;
    },
  },
});

export const { showSidebar, showMain, showProfile } = screenSlice.actions;
export default screenSlice.reducer;
