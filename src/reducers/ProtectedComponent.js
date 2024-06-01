
import React from 'react'
import { useConsumer } from './userContext.js';
import { Navigate } from 'react-router-dom';
export const ProtectedComponent = ({children}) => {
    const {user}=useConsumer();
    if(!user){
        return <Navigate to="/login" replace={true}/>
    }
  else{
    return (
        <>
        {children}
        </>
     )
  }
}
