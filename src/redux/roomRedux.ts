import { IRoom } from "./../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const roomSlice = createSlice({
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
    updateRoom: (state, action: PayloadAction<IRoom>) => {
      let index = state.rooms.findIndex(
        (elem) => elem._id === action.payload._id
      );
      state.rooms.splice(index, 1);
      state.rooms = [action.payload, ...state.rooms];
    },
    clearRoom: (state) => {
      state.rooms = [];
    },
  },
});

export const { getMyRooms, clearRoom, deleteRoom, createRoom, updateRoom } =
  roomSlice.actions;
export default roomSlice.reducer;
