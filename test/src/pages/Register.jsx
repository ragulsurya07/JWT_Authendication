import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ username:"", email: "", password: "" });

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const submit = async (event) => {
    event.preventDefault();
    try {
      console.log('values====', {values});
      const { data } = await axios.post( "http://localhost:4000/register", { ...values }, { withCredentials: true });
      console.log('data--------------->>', data);
      if (data) {
        if (data.errors) {
          const { username, email, password } = data.errors;
          if (username) generateError(username);
          else if (email) generateError(email);
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
            <h3>Create a new account</h3>
            <form onSubmit={(e)=>submit(e)} >
                <input type="text" name='username' placeholder='enter username' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}></input><br></br>
                <input type="email" name='email' placeholder='enter your email' onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}></input><br></br>
                <input type="password" name='password' placeholder='Type password' onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}></input><br></br>
                <input type='submit' className='btn btn-primary' value='Register'/>
                <Link to='/login'><p id='link'>Already have an account? Login</p></Link>
            </form>
            <ToastContainer />
        </div>
        </div>
        </div>
    </div>
    </div>
);
}

export default Register;
