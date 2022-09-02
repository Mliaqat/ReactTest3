import React from "react";
import { useSelector } from "react-redux";
import AddCourse from "../AddCourse/AddCourse";

import GreenPass from "../GreenPass/GreenPass";
import "./Home.css";

function Home() {
  let userData = useSelector((state) => state.data.data);
  // let userrole = useSelector((state) => state.ui);
  const userRole=localStorage.getItem("userrole")
 

  return (
    <div>
     { userRole == "USER" ? (
  <AddCourse></AddCourse>
     ):(
<GreenPass></GreenPass>
     )

     }
      
    </div>
  );
}

export default Home;
