import React,{useState,useEffect} from 'react'
import './Content.css'
import laptop from './laptop.svg'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Content = () => {

    const[signedOut , setsignedOut] = useState(false)
    const[username,setUsername] = useState('')

    useEffect(() => {
        getSignedInUserProfile() //to make the first fetch fast
        setInterval(getSignedInUserProfile,3000) //to constantly check for the user sign in
    },[])

    const getSignedInUserProfile = async() =>{
        try{
            const response = await axios.get('http://localhost:8000/user/userSignedInProfile',{withCredentials : true})
            
            setUsername(response.data.username)
        }catch(err){
            
            setsignedOut(true)
        }
    }

    return (
        <div className='content'>
            <h2 className='heading'>Kangaes is a place to let all of your ideas be revitalized!</h2>
            <img src={laptop} alt="laptop" className='laptop'/>
            {
                (!signedOut && username)
                &&
                <div className=''>
                    <h4 className='heading'><strong>{ `Hello ${username}!`}</strong></h4>
                    
                    <NavLink exact to='/blog/writeblog'>
                        <button className='btn my-2 mx-5'>Start Writing</button>
                    </NavLink>
                </div>
                
            }
            
                        
        </div>
    )
}

export default Content
