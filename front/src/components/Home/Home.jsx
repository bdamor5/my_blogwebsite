import React,{useState,useEffect} from 'react'
import Section from '../Section/Section'
import Content from '../Content/Content'
import Blogs from '../Blogs/Blogs'
import './Home.css'
import axios from 'axios'

const Home = () => {

    const [blogs,setBlogs] = useState([])
    const [show,setShow] = useState(false)

    useEffect(() => {
        getAllBlogs()
    },[])  
  
    const getAllBlogs = async(query) =>{
        try{
            // console.log('home',query)

            if(query){
                const response = await axios.get(`http://localhost:8000/blog/all?categories=${query}`)
                console.log(response.data)
                setBlogs(response.data)

            }else{  
                const response = await axios.get('http://localhost:8000/blog/all')
                console.log(response.data)
                setBlogs(response.data)
            }
        }catch(err){
          
        }
    }

    const catFilter = (query) =>{
        // console.log('home',query)
            getAllBlogs(query)
    }

    return (
        <div>
        <div className='container-fluid mt-2'>
            <div className='row'>

                <div className='col-4 accord'>
                    <Section catFilter={catFilter}/>
                </div>

                <div className='col-8 contents'>
                    <Content/>
                    <br/>
                    <Blogs filteredBlogs={blogs}/>
                </div>
            </div>
        </div>
            
        </div>
    )
}

export default Home
