import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useConsumer } from "../reducers/userContext.js";
import { BASE_URL } from "./url.js";
export const Navbar = () => {
  const {user}=useConsumer();
  const navigate=useNavigate();
  async function logoutData(){
    try {
      const response=await fetch(`${BASE_URL}/api/user/logout`,{
        method:"POST",
        credentials:'include'
      });
      const data=await response.json();
      console.log(data,'data ka haal');
      if(data.success===true){
        localStorage.removeItem('user');
        navigate("https://main--thesocialnetworkapp.netlify.app/login");
      }    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <nav id="nav">
        <div class="nav-wrapper">
          <Link to="/"  className="brand-logo left b">
            The Social Network App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {!user&&(<Link to="/login">Login</Link>
)}
            </li>
            <li>
              {!user&&(<Link to="/signup" >Signup</Link>)}
            </li>
            <li>
              {user&&(<Link to="/profile">Profile</Link>)}
            </li>
            <li>
             {user&&( <Link to="/create-post">createPost</Link>)}
            </li>
            {user&&(<li>
            <button  onClick={(e)=>logoutData()} className="btn waves-effect waves-light #ff5252 blue accent-2 mt-10" type="submit" name="action">Logout
            </button>
            </li>)}
          </ul>
        </div>
      </nav>
    </>
  );
};
