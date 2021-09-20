import React,{useState,useEffect} from "react";
import OneBlog from "../OneBlog/OneBlog";
import "./Blogs.css";
import axios from 'axios'

const Blogs = ({filteredBlogs}) => {

//   const [blog,setBlog] = useState([])

//   useEffect(() =>{
//       getAllBlogs();
//   },[])

//   const getAllBlogs = async() =>{
//       try{

//           const response = await axios.get('http://localhost:8000/blog/all')
//           // console.log(response.data)
//           setBlog(response.data)

//       }catch(err){
        
//       }
//   }

  return(
         <div className='blogs'>
            {
                filteredBlogs.map((curr)=>{
                    return <OneBlog blogtitle={curr.title} blogcategory={curr.category} blogreadTime={curr.readTime} blogdescription={curr.description} blogid={curr._id} blogusername={curr.username} blogemail={curr.useremail} blogimage={curr.image}/>
                })
            }
        </div>
  )
};

export default Blogs;
