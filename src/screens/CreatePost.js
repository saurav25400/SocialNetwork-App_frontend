import React,{useState} from "react";
import M from "materialize-css";
import { BASE_URL } from "../component/url";

export const CreatePost = () => {
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");

  const[image,setImage]=useState("");

  async function postData() {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "socialnetwork");
      formData.append("folder", "socialmediaapp");
  
      // Upload the image to Cloudinary
      const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/doqxmemfg/image/upload", {
        method: "POST",
        body: formData
      });
  
      const cloudinaryData = await cloudinaryResponse.json();
      if (!cloudinaryResponse.ok) {
        throw new Error(cloudinaryData.error.message);
      }
  
      console.log(cloudinaryData);
      console.log(cloudinaryData.url);
      const imageUrl = cloudinaryData.url;
      console.log(imageUrl);
  
      // Store the post data in the database
      const postResponse = await fetch(`${BASE_URL}/api/posts/createpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify({
          title: title,
          body: desc,
          photo: imageUrl
        })
      });
  
      const postData = await postResponse.json();
      if (!postResponse.ok) {
        throw new Error(postData.error.message);
      }
  
      console.log(postData);
      M.toast({html: "Your post has been posted successfully!!!", classes: '#c62828 red darken-3'});
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  
  return (
    <div
      className="card input-filed"
      style={{
        margin: "20px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="title" />
      <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" />
      <div class="file-field input-field">
        <div class="btn">
          <span>Upload Photo</span>
          <input type="file"
          // value={image}
          onChange={(e)=>{
            console.log(e.target.files[0]);
            setImage(e.target.files[0])}}
          />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
      <button onClick={postData} className="btn waves-effect waves-light #ff5252 red accent-2 mt-10" type="submit" name="action">Upload Post
    <i class="material-icons right">send</i>
  </button>
    </div>
  );
};
