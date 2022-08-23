import { publicRequest } from "./../utils/requestMethod";
import { IRoom } from "./../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [] as IRoom[],
  },
  reducers: {
    getMyRooms: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = action.payload;
    },
    deleteRoom: (state, action: PayloadAction<string>) => {
      let index = state.rooms.findIndex((elem) => elem._id === action.payload);
      state.rooms.splice(index, 1);
    },
    createRoom: (state, action: PayloadAction<IRoom>) => {
      state.rooms = [action.payload, ...state.rooms];
    },
  },
});

export const { getMyRooms, deleteRoom, createRoom } = userSlice.actions;
export default userSlice.reducer;
