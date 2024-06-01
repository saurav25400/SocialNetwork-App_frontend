import { createContext ,useEffect,useState} from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const userContext=createContext();


export const UserProvider=({children})=>{
    const [user,setUser]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const users=JSON.parse(localStorage.getItem('user'));
        if(users){
            setUser(users);
        }
        else{
            navigate("/login");
        }

    },[]);
    console.log(user);
    return (<>
    <userContext.Provider value={{user}}>
    {children}
    </userContext.Provider>
    </>)
}
//custom hook
export const useConsumer=()=>{
const {user}=useContext(userContext);
console.log(user,'user');
return {user};
}