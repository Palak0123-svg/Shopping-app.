import React ,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios"
import { useNavigate , useLocation ,NavLink } from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/Auth";

const Login = () => {
  // useState
 
  const[password,setPassword] = useState("");
  const[email,setEmail] = useState("");
  const[auth,setAuth] = useAuth();
  //useNevigate
  const nevigate = useNavigate();
  // use location 
  const location = useLocation();
  // handel submit (when we submit the from th page refresh so to prevert it we use this method)
  const handleSubmit= async(e)=>{
    e.preventDefault();
   // console.log(name,email,password,phone,address);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
      if (res && res.data.success) {
        //toast.success("register Successfully");
        alert(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data));
        nevigate(location.state ||"/");
      } else {
       // toast.error(res.data.message);
       alert(res.data.message);
      }
    } catch (error) {
      //console.log(error);
     // toast.error("Something went wrong");
      alert("Something went wrong");
    }
    //console.log(process.env.REACT_APP_API);
  }

  const labels=document.querySelectorAll(".Myform-control label")
 
labels.forEach(label=>{
    label.innerHTML=label.innerText
      .split('')
      .map((letter,idx)=>`<span style="transition-delay:${idx*50}ms">${letter}</span>`)
      //.map((letter,idx)=>`<span style="transition-delay:${idx*50}ms">${letter}</sapn>`)
      .join('')
})
  return (
    <Layout title={"Register"}>
      <div className="Mybody">
      <div className="login Mycontainer">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
       
          <div className="form-group Myform-control">
            <input
              type="email"
              //className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="exampleInputEmail1"
              //placeholder="Enter email"
              required
            />
            <label htmlFor="">Email</label>
            
          </div>
          <div className="form-group Myform-control">
            <input
              type="password"
              //className="form-control"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              id="exampleInputPassword1"
             // placeholder="Password"
              required
            />
            <label htmlFor="">Password</label>
          </div>
          <div className="forgot-password">
          <button type="submit" className="btn btn-primary Mybtn">
            Login
          </button>
          
          <button type="submit" className="btn btn-primary Mybtn" onClick={()=>{nevigate('/forgot-password')}}>
            forgot-Password
          </button>
          </div>
          <p class="text">Don't have an accont? <NavLink to="/register" >
                Register 
              </NavLink></p>
        
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default Login;
