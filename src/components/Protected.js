import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({Component}) =>{ 
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if(!token){
        navigate('/')
    }
  });
  return (
    <div>
      <Component/>
    </div>
  );
};

export default Protected;
