import React ,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    // useState
 
  const[newPassword,setnewPassword] = useState("");
  const[email,setEmail] = useState("");
  const[answer,setAnswer] = useState("");

  //useNevigate
  const nevigate = useNavigate();
   
  
  // handel submit (when we submit the from th page refresh so to prevert it we use this method)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer
      });
      if (res && res.data.success) {
        alert(res.data.message)

        nevigate("/login");
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      //console.log(error);
      alert("Something went wrong in");
      return;
    }
  };
  return (
    <Layout title={'Forgot-password'}>
        <div className="login">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
       
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              id="exampleInputEmail1"
              placeholder="Enter email"
              required
            />
            
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e)=>setnewPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="newPassword"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Enter your favorite book"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword