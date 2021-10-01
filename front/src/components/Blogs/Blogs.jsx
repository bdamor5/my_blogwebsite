import React from "react";
import OneBlog from "../OneBlog/OneBlog";
import "./Blogs.css";

const Blogs = ({filteredBlogs}) => {

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
