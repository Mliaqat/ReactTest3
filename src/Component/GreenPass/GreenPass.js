import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDataActions } from '../../Store/addCourseSlice';
import {Link} from "react-router-dom"

import "./GreenPass.css"

function GreenPass() {

  const dispatch = useDispatch();
  const [aprove,setAprove]=useState([])
  let courseData = useSelector((state) => state.addCourse.addCourse);
  console.log(aprove)

  
  const sendRequest=(data)=>{
    setAprove(currentArray => [...currentArray, data.course])
    const updateData ={
      course:data.course,
      email:data.email,
      status:"Aproved"
    }
    dispatch(addCourseDataActions.addCourse(updateData));
  }

  const cancelRequest=(data)=>{
    setAprove(currentArray => [...currentArray, data.course])
    const updateData ={
      course:data.course,
      email:data.email,
      status:"Reject"
    }
    dispatch(addCourseDataActions.addCourse(updateData));
  }


  return (
    <div>
       <div className='logout'>
         <h3> <Link to="/">Logout</Link></h3>
        </div>
      <div>
        <h1 className='my-5 text-white'>User Request</h1>
      </div>
      {courseData.length > 0 ? (
        <>
        {
courseData.map((data, index) => {
  return (
    <div className="course-layout" key={index}>
      <div className="course">
          <h3 className="text-white">{data.course}</h3>
      </div>
      <div>
        {aprove.includes(`${data.course}`) ? (
          <h3 className='text-white'>Checked</h3>
        ):(<>
           <button className="accept_bth" onClick={()=>sendRequest(data)}>Accept</button>
           <button className="reject_bth" onClick={()=>cancelRequest(data)}>Reject</button></>)}
     
      </div>
    </div>
  );
})
        }</>
      ):(
        <div>
          <h3 className='text-white'>No Request Recived</h3>
        </div>
      )
      
      
      }
    </div>
  )
}

export default GreenPass;