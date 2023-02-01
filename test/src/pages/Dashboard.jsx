import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useState } from "react";


export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [name, setName] = useState();
  
  useEffect(() => {
    const verifyUser = async () => {
      console.log('cookies ----->> ', cookies);
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.get("http://localhost:4000", { withCredentials: true } );
        setName(data.username)
        console.log('delete token!--->>', data);
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } 
      }
    };

    verifyUser();

  }, [cookies, setCookie, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  
  return (
    <div className="chatApp">
    <div className="container">
      <p>username : {name}</p>
      <button onClick={logOut} >Logout</button>
      </div>
      </div>
  );
}
