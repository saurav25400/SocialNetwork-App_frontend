import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import { BASE_URL } from '../component/url.js';

export const UserProfile = () => {
    const[userProfile,setUerProfile]=useState(null);
    const[follower,setFollower]=useState(null);
    const[following,setFollowing]=useState(null);
    const {userid}=useParams();
    console.log(userid);

    const getUserDetails=async()=>{
        try {
            const respone=await fetch(`${BASE_URL}/api/userDetails/get-all-details/${userid}`,{
                method:"GET",
                credentials:'include'
            });
            const results=await respone.json();
            console.log(results.result);
            setFollower(results.result.follower);
            setFollowing(results.result.following);
        } catch (error) {
            console.log(error);
            
        }

    }

    useEffect(()=>{
        getUserDetails();
    },[])
   


    const getOtherUserDetails=async(id)=>{
        try {
            const response=await fetch(`${BASE_URL}/api/userDetails/user/${userid}`,{
                method:"GET",
                credentials:'include'
            });
            const results=await response.json();

            console.log(results.result,'ye tah');
            // setUerProfile(results.result);
            if(results.success===true){
                setUerProfile(results.result);
            }
            else{
                M.toast({html: " user has not posted till now!!!", classes: '#c62828 red darken-3'});

            }

        

            
        } catch (error) {
            console.log(error);
            
        }

    }

    useEffect(()=>{
        getOtherUserDetails(userid);
    },[])

    async function followUser(){
        try {
            const response=await fetch(`${BASE_URL}/api/userDetails/follow/${userid}`,{
                method:"PUT",
                credentials:'include',
                // body:JSON.stringify({followId:userid})

            });
            const results=await response.json();

            if(results.success){
                // setFollower(results.result.follower);
                // setFollowing(results.result.following);
                getOtherUserDetails()
                console.log(true);

            }
            else{
                M.toast({html: "something is wrong", classes: '#c62828 red darken-3'});

            }
            
        } catch (error) {
            console.log(error);
            
        }

        
    }

    async function unFollowUser(){
        try {
            const response=await fetch(`${BASE_URL}/api/userDetails/un-follow/${userid}`,{
                method:"PUT",
                credentials:'include',
                // body:JSON.stringify({followId:userid})

            });
            const results=await response.json();

            if(results.success){
                // setFollower(results.result.follower);
                // setFollowing(results.result.following);
                getOtherUserDetails()
                console.log(true);

            }
            else{
                M.toast({html: "something is wrong", classes: '#c62828 red darken-3'});

            }
            
        } catch (error) {
            console.log(error);
            
        }

        
    }

    
    console.log(userProfile,'userProfile');
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{ display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}}>
                <div>
                    <input type="file" hidden/>
                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRDcTtqtraPzxBSoCLV8CPMKK4Z5Zn-m64oovU_Ss9bL2dv6fcI" style={{width:"160px",height:"160px",borderRadius:"50%"}} alt="not found"/>
                </div>
                <div >
                    <h1>{userProfile!==null&&userProfile[0].postedBy.name}</h1>
                    <h5>{userProfile!==null&&userProfile[0].postedBy.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-around",width:"108%"}}>
                    <h6>{userProfile!==null&&userProfile.length} posts</h6>
                    <h6>{follower!==null&&follower.length} followers</h6>
                    <h6>{following!=null&&following.length} following</h6>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={()=>followUser()}
              className="btn waves-effect waves-light #ff5252 red accent-2 mt-10"
              type="submit"
              name="action"
            >
              Follow
              <i className="material-icons right"></i>
            </button>
            <button
              onClick={()=>unFollowUser()}
              className="btn waves-effect waves-light #ff5252 red accent-2 mt-10"
              type="submit"
              name="action"
            >
              UnFollow
              <i className="material-icons right"></i>
            </button>
          </div>
          <br />
                </div>
    
            </div>
            <div className="gallery">
                {userProfile==undefined||userProfile==null&&(<h1>Loading...</h1>)}
                {userProfile!==null&&userProfile.map((items,index)=>(
                    <img className='item' src={items.photo} alt="not found"/>
                ))}
                </div>
        </div>
      )
}
