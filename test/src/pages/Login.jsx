import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post( "http://localhost:4000/login", { ...values }, { withCredentials: true });
      // console.log('data--------------->>', data);
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  
  return (
    <div className="register">
    <div className="container">
        <div className='w-50 m-auto mt-5 pt-5'>
        <div className="card">
        <div className="card-body">
            <h3>Login to your account</h3>
            <form onSubmit={(e)=>submit(e)} >
                <input type="email" name='email' placeholder='enter your email' onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}></input><br></br>
                <input type="password" name='password' placeholder='Type password' onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}></input><br></br>
                <input type='submit' className='btn btn-primary' value='Login'/>
                <Link to='/register'><p id='link'>Already have an account? register</p></Link>
            </form>
            <ToastContainer />
        </div>
        </div>
        </div>
    </div>
    </div>
);

}

export default Login;
