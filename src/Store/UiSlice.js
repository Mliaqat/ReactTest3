import { createSlice } from "@reduxjs/toolkit";

const uitoggle = createSlice({
  name: "ui",
  initialState: {
    toggle: false,
    role: "",
  },
  reducers: {
    submitData(state) {
      state.toggle = !state.toggle;
    },
    userRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const uitoggleaction = uitoggle.actions;

export default uitoggle;
