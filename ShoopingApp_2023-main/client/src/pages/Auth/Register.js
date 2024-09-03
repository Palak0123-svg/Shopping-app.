import React ,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios"
import { useNavigate ,NavLink } from "react-router-dom";
import toast from 'react-hot-toast';
const Register = () => {
  // useState
  const[name,setName] = useState("");
  const[password,setPassword] = useState("");
  const[email,setEmail] = useState("");
  const[phone,setPhone] = useState("");
  const[address,setAddress] = useState("");
  const[answer,setAnswer] = useState("");

  //useNevigate
  const nevigate = useNavigate();

  // handel submit (when we submit the from th page refresh so to prevert it we use this method)
  const handleSubmit= async(e)=>{
    e.preventDefault();
   // console.log(name,email,password,phone,address);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer})
      if (res && res.data.success) {
        toast.success("register Successfully");
        nevigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //console.log(error);
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
      <div className="Mybody register">
      <div className=" Mycontainer">
        <h1>Registration Page</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group Myform-control">
            <input
              type="text"
              //className="form-control"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="exampleInputEmail1"
              //placeholder="Enter Name"
              required
            />
            <label htmlFor="">Enter Your Name</label>
          </div>
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
            <label htmlFor="">Enter Your Email</label>
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
            <label htmlFor="">Enter Your Password</label>
          </div>
          <div className="form-group Myform-control">
            <input
              type="text"
              //className="form-control"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              id="exampleInputEmail1"
              //placeholder="Enter Phone Number"
              required
            />
            <label htmlFor="">Enter Your PhoneNumber</label>
          </div>
          <div className="form-group Myform-control">
            <input
              type="text"
              //className="form-control"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              id="exampleInputEmail1"
              //placeholder="Enter address"
              required
            />
            <label htmlFor="">Enter Your Address</label>
          </div>
          <div className="form-group Myform-control">
            <input
              type="text"
              //className="form-control"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              id="exampleInputEmail1"
              //placeholder="Enter your favorite book"
              required
            />
            <label htmlFor="">Enter Your favorite Book</label>
          </div>
          
          <button type="submit" className="btn btn-primary Mybtn">
            Register
          </button>
          <p class="text">Allready have an accont? <NavLink to="/login" >
                Login 
              </NavLink></p>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default Register;
