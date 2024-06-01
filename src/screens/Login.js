import React,{useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App.js';
import { BASE_URL } from '../component/url.js';
export const Login = () => {
  // const {state,dispatch}=useContext(userContext);
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const navigate=useNavigate();
  const postData=async()=>{
    if(!email||!password){
      M.toast({html: 'You need to provide all the details !!',classes:'#c62828 red darken-3'})
      return;
    }
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regexEmail.test(email)) {
      M.toast({html: 'Email is invalid!!!', classes: '#c62828 red darken-3'});
      return;
    }
  
   try {
    const response=await fetch(`${BASE_URL}/api/user/signin`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials: 'include', // Include this line to include cookies in the request
      body:JSON.stringify({
        email:email,
        password:password
      })
    });

    const res=await response.json();
    console.log(res);
    if(res.success){
      M.toast({html:res.message,classes:'purple'});
      if(!localStorage.getItem('user')){
        localStorage.setItem('user',JSON.stringify(res.user));  //setting users data in local storage
        // dispatch({type:'USER',payload:res.user});
      }
     else{
      localStorage.setItem('user',JSON.stringify(res.user));  //replacing existing  users data in local storage
     }
      navigate("/");
    }
    else{
      M.toast({html:res.message,classes:'#c62828 red darken-3'})
    }
   } catch (error) {
    M.toast({html: error.message,classes:'#c62828 red darken-3'})    
   }
  }
  return (
    <div className="card mycard">
    <div className="card-content auth-card">
        <h3>The Social Network App</h3>
        {/* <br/> */}
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="mt-10"/>
      <br/>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>

      <button onClick={postData} className="btn waves-effect waves-light #ff5252 red accent-2 mt-10" type="submit" name="action">Login
    <i class="material-icons right">send</i>
  </button>
  <h6><Link to="/signup"><span>Don't have an account? click to Signup.</span></Link></h6>

    </div>
  </div>
  )
}
