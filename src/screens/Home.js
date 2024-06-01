import React,{useState,useEffect} from 'react'
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../component/url.js';

export const Home = () => {
  const [data,setData]=useState(null);
  const[likes,setLikes]=useState(null);
  const getData=async()=>{
    try {
      const response=await fetch(`${BASE_URL}/api/posts/all-post`,{
        credentials: 'include' 
      });
      const responseData=await response.json();
      console.log(responseData,'helllooooooooo');
      setData(responseData.result);


    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
   
    getData();
  },[]);
//for likes and unlikes

const getLikes=async(postId)=>{
  try {
    const getRes=await fetch(`${BASE_URL}/api/posts/likes/${postId}`,{
      method:'PUT',
      header:{
        "Content-Type":"application/json"
      },
      credentials:'include',
      // body:JSON.stringify({postId:id})
    });
    const response=await getRes.json();
    console.log(response,'response');
    const likesArray=response.result.likes;
    console.log(likesArray,'likesArray');
    
    setLikes(likesArray);
  } catch (error) {
    console.log(error);
    
  }
}
const getUnLikes=async(postId)=>{
  try {
    const getRes=await fetch(`${BASE_URL}/api/posts/un-likes/user/${postId}`,{
      method:'PUT',
      header:{
        "Content-Type":"application/json"
      },
      credentials:'include',
      // body:JSON.stringify({postId:id})
    });
    const response=await getRes.json();
    const UnlikesArray=response.result.likes;
    console.log(UnlikesArray,'UnlikesArray');
    setLikes(UnlikesArray);
  } catch (error) {
    console.log(error);
    
  }
}

const makeComment=(text,postId)=>{
  console.log(text,'text');
  // try {
    const response=fetch(`${BASE_URL}/api/posts/comments/user/posts/${postId}/${text}`,{
      method:'PUT',
      header:{
        "Content-Type":"application/json"
      },
      credentials:'include',
    }).then((res)=>res.json()).then((result)=>{
      console.log(result);
      const newData=data.map((item)=>{
        if(item._id===result._id){
          return result;
        }
        else{
          return item;
        }
      });
      setData(newData);

    }).catch(error=>console.log(error));
  
}

useEffect(()=>{
  getLikes();
  
},[])

async function deletePost(postId){
  try {
    const response=await fetch(`${BASE_URL}/api/posts/delete-post/${postId}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const result=await response.json();
    if(result.success){
      const newData=data.filter((items)=>items._id!==postId);
      setData(newData);
      M.toast({html:result.message,classes:'red'})

    }
    else{
      M.toast({html:result.message,classes:'red'})
      console.log(result.message);
    }

    
  } catch (error) {
    console.log(error);
    
  }
}




  if(data===null||data===undefined){
    return (<h1>Loading...</h1>)
  }
  else{
    console.log(data,'dtaa');
    return (
      <div className="home">
        {data.map((d,index)=>(
          <>
          <div className="card home-card" key={d._id}>
          <h5 style={{cursor:"pointer"}}><Link to={`profile/${d.postedBy._id}`}>{d.postedBy.name}</Link>
          <i style={{float:"right",cursor:"pointer"}}onClick={(e)=>deletePost(d._id)} class="material-icons" >delete</i>
          </h5>
          <div className='card-image'>
            <img style={{height:"100%",width:"100%",borderRadius:"4px"}} src={d.photo} alt="not found"/>
          </div>
          <div className='card-content'>
          <i onClick={(e)=>getLikes(d._id)} style={{cursor:"pointer"}}class="material-icons col" >thumb_up</i>
          {'  '}
          <i onClick={(e)=>getUnLikes(d._id)} style={{cursor:"pointer"}} class="material-icons col" >thumb_down</i>
          <h5>{likes&&likes.length}likes</h5>
            <h6>{d.title}</h6>
            <p>{d.body}</p>
            {d.comment.map((record)=>(
              <h6><span style={{fontWeight:'600'}}>{record.postedBy.name}</span>:{record.text}</h6>
            ))}
            <form onSubmit={(e)=>{
              e.preventDefault();
              console.log(e.target[0].value,'form');
              makeComment(e.target[0].value,d._id);
              e.target[0].value='';

            }}>
            <input type="text" placeholder="add comment"/>
            </form>
          </div>
  
        </div>
          </>
        ))}
      </div>
    )
  }
}
