import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDataActions } from '../../Store/addCourseSlice';
import { uitoggleaction } from "../../Store/UiSlice";
import {Link} from "react-router-dom";
import "./AddCourse.css"

function AddCourse() {
  const [course, setCourse] = useState();
  const [active, setActive] = useState();
  const [aprove,setAprove]=useState([])
  const [error, setError] = useState(false);
  const dispatch = useDispatch();


  let courseData = useSelector((state) => state.courseData.courseData);
  let greenPass = useSelector((state) => state.addCourse.addCourse);

  const loginEmail = localStorage.getItem("userdata")

  const loginUserData = courseData.filter(data => data.email == loginEmail)
  const greenPassData = greenPass.filter(data => data.email == loginEmail)

  var myFinalArray = [...loginUserData ,...greenPassData]

  const filteredArr = myFinalArray.reverse().reduce((acc, current) => {
    const x = acc.find(item => item.course === current.course);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

    const data = {
    course: course,
    email: loginEmail,
    status: "Pending"
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://reacttest2-8df5e-default-rtdb.firebaseio.com/Course.json",
        data
      )
      .then((res) => {
        console.log(res)

        dispatch(uitoggleaction.submitData());
      })
      .catch((error) => {
        setError(true)
      });

  };

  const sendRequest = async (data) => {
    setActive(data.course)
    setAprove(currentArray => [...currentArray, data.course])

    const updateData = {
      course: data.course,
      email: data.email,
      status: data.status
    }
    dispatch(addCourseDataActions.addCourse(updateData));

    localStorage.setItem("GreenCard", JSON.stringify(data))
  }


  return (
    <div>

      <div className='w-50 mx-auto mt-5'>
        <div className='logout'>
         <h3> <Link to="/">Logout</Link></h3>
        </div>
        {error && (
              <p className="error-text">Network Down</p>
            )}
        <div className="addcourse">
          <div>
            <input
              type="email"
              className="form-control"
              placeholder="Add Your Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <div>
            <button className="add_bth" onClick={(e) => handleSubmit(e)}>Add Course</button>
          </div>

        </div>
      </div>
      <div>

      </div>


      {filteredArr .length > 0 ? (
        <>
          {filteredArr .map((data, index) => {
            return (
              <div className={  aprove.includes(`${data.course}`) ? "course-layout active" : "course-layout "} key={index}>
                <div className="course">
                  <h3 className="text-white">{data.course}</h3>
                 
                </div>
                <div>
                  { data.status == "Aproved" || data.status == "Reject" ? (
                    <>
                    <h3 className={`${data.status}`}>{data.status}</h3>
                    </>
                  ):(
                    aprove.includes(`${data.course}`) ? (
                      <h3 className='req'>Request Send</h3>
                    ):(
                     <button className="request_bth" onClick={() => sendRequest(data)}>Request</button>)
                      
                    
                   
                  )

                  }
                        
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>
          <h2 className='text-white mt-5'>Please Add Your Course</h2>
        </div>
      )
      }


    </div>
  )
}

export default AddCourse