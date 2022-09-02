import { createSlice } from "@reduxjs/toolkit";

const addCourseDataSlice = createSlice({
  name: "addCourseData",
  initialState: {
    addCourse: []
    ,
  },
  reducers: {
    addCourse(state, action) {
      const newitem = action.payload;
    const existingItem = state.addCourse.find((item) => item.course === newitem.course);
       if (existingItem){
        existingItem.status=newitem.status
       }
       else{
        state.addCourse.push(newitem);
       }
      
    },
  
  },
});

export const addCourseDataActions = addCourseDataSlice.actions;
export default addCourseDataSlice
