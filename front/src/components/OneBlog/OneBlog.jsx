import React,{useState,useEffect} from "react";
import "./OneBlog.css";
import {NavLink} from 'react-router-dom'
import axios from "axios";

const OneBlog = ({blogtitle,blogcategory,blogreadTime,blogdescription,blogid,blogusername,blogemail,blogimage}) => {

  const[email,setEmail] = useState('')

    useEffect(() => { 
      getSignedInUserProfile() //to make the first fetch fast
    },[])

    const getSignedInUserProfile = async() =>{
        try{
            const response = await axios.get('http://localhost:8000/user/userSignedInProfile',{withCredentials : true})
            
            setEmail(response.data.email)
        }catch(err){            
            setEmail('')
        }
      }


  return (
    <>
      <div className="blog" title='Click on read more'>
        <img src={`${blogimage}`} alt="" className="blogimg img-fluid" />
        <h5>{blogtitle}</h5>
        <div className="cat-read">
          <h6>{blogcategory}</h6>
          <h6>{blogreadTime}</h6>
        </div>
        <p>
          {blogdescription.slice(0,65)} 
          <NavLink to={`/blog/readblog/${blogid}`} className='link'>- <span className='read-more'>read more about this blog...</span> </NavLink>
        </p>
        {
          blogemail === email
          ?(<h6 className='you'>
              - by you
            </h6>
            )
          :(<h6 className='username'>
              - by {blogusername}
            </h6>
          )
        }     
      </div>
    </>
  );
};

export default OneBlog;
