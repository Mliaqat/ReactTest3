import { createSlice } from "@reduxjs/toolkit";

const courseDataSlice = createSlice({
  name: "courseData",
  initialState: {
    courseData: []
    ,
  },
  reducers: {
    courseData(state, action) {
      const newitem = action.payload;
      state. courseData = [];
      newitem.forEach(function (newitem) {
        state. courseData.push(newitem);
      });
    },
  
  },
});

export const courseDataActions = courseDataSlice.actions;
export default courseDataSlice;
