import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: { data: [] },
  reducers: {
    storeData(state, action) {
      const newitem = action.payload;
      state.data = [];
      newitem.forEach(function (newitem) {
        state.data.push(newitem);
      });
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
