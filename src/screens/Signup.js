import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../component/url';

export const Signup = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const postData=async()=>{
    if(!name||!email||!password){
      M.toast({html: 'You need to provide all the details !!',classes:'#c62828 red darken-3'})
      return;
    }
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regexEmail.test(email)) {
      M.toast({html: 'Email is invalid!!!', classes: '#c62828 red darken-3'});
      return;
    }
  
   try {
    const response=await fetch(`${BASE_URL}/api/user/signup`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    });

    const res=await response.json();
    console.log(res);
    if(res.success){
      M.toast({html:res.message,classes:'purple'});
      navigate("/login");
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
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}placeholder="Enter Your Name" className="mt-10"/>
      <br/>
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="mt-10"/>
      <br/>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>

      <button onClick={postData} className="btn waves-effect waves-light #ff5252 red accent-2 mt-10" type="submit" name="action">Signup
    <i className="material-icons right">send</i>
  </button>
  <br/>
  <h6><Link to="/login"><span>Already have an account? click to Signin.</span></Link></h6>
    </div>
  </div>

  )
}
