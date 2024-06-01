import React, { useEffect, useState } from "react";
import { useConsumer } from "../reducers/userContext.js";
import M from "materialize-css";
import { BASE_URL } from "../component/url.js";
export const Profile = () => {
  const [myPost, setPost] = useState(null);
  const { user } = useConsumer();
  const [myProfile,setMyProfile]=useState(null);
  
  const getSelfDetails=async(id)=>{
    try {
        const response=await fetch(`${BASE_URL}/api/userDetails/get-myself/user-details/fetch-user`,{
            method:"GET",
            credentials:'include'
        });
        const results=await response.json();

        console.log(results.result,'ye tah');
        // setUerProfile(results.result);
        if(results.success===true){
            setMyProfile(results.result);
        }
        else{
            M.toast({html: " user has not posted till now!!!", classes: '#c62828 red darken-3'});

        }

    

        
    } catch (error) {
        console.log(error);
        
    }

}


  useEffect(() => {
    async function getSpecificPost() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/posts/my-post/specific`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setPost(data.result);
      } catch (error) {
        console.log(error);
      }
    }
    getSpecificPost();
    getSelfDetails();
  }, []);
  if (!myPost) {
    return <h1>Loading...</h1>;
  }

   


  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            style={{ width: "160px", height: "160px", borderRadius: "50%" }}
            alt="not found"
          />  
        </div>
        <div>
          <h1>{user.name}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "108%",
            }}
          >
            <h6>{myPost !== null && myPost.length} posts</h6>
            <h6>{myProfile!=null&&myProfile.follower.length} followers</h6>
            <h6>{myProfile!=null&&myProfile.following.length} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPost.map((items, index) => (
          <img className="item" src={items.photo} alt="not found" />
        ))}
      </div>
    </div>
  );
};
// }
