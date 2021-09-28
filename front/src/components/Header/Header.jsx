import React,{useState,useEffect} from 'react'
import './Header.css'
import {NavLink,useHistory} from 'react-router-dom'
import icon from './feather.png'
import axios from 'axios'

const Header = () => {

    const[signOut , setsignOut] = useState()
    const[username,setUsername] = useState('')
    const history = useHistory()


    useEffect(() => { 
        getSignedInUserProfile() //to make the first fetch fast
        setInterval(getSignedInUserProfile,2000) //to constantly check for the user sign in   
    },[])

    const getSignedInUserProfile = async() =>{
        try{
            const response = await axios.get('http://localhost:8000/user/userSignedInProfile',{withCredentials : true})
            
            if(response.data.username){
                setUsername(response.data.username)
                setsignOut(false)
            }else{
                setUsername('')
            }
        }catch(err){
            setUsername('')
        }
    } 

    const handleSignout = async() =>{
        try{    
            await axios.get('http://localhost:8000/user/signout',{withCredentials : true})
            
            setsignOut(true)
            setUsername('')
        }catch(err){
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink className="navbar-brand" to="/" exact>Kangaes  <span className='line'><img src={icon} alt="feather" /></span>  </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                        signOut === false && username != ''
                        ?<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <NavLink activeClassName='navlink-hover' className="nav-link" aria-current="page" to="/user/signout" exact onClick={handleSignout}>Signout</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink activeClassName='navlink-hover' className="nav-link" aria-current="page" to="/user/profile" exact><i className="far fa-user" title={`${username}'s profile`}></i></NavLink>
                            </li>
                        </ul>
                        :<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className='nav-item'>   
                                <NavLink activeClassName='navlink-hover' className="nav-link" aria-current="page" to="/user/signup" exact>Signup</NavLink>
                            </li>
                            <li className='nav-item'>   
                                <NavLink activeClassName='navlink-hover' className="nav-link" aria-current="page" to="/user/signin" exact>Signin</NavLink>
                            </li>
                        </ul> 
                        }
                        
                    </div>
                </div>
            </nav>           
            {
                signOut && username === ''
                ?(<div>
                        <div class="alert alert-danger mx-auto" role="alert">                        
                            <div class="d-flex justify-content-center align-items-center">
                                <p>User Signed Out ! Redirecting to Sign In...</p>
                                <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div style={{opacity : 0}}>
                            {   
                                setTimeout(() => {
                                    setsignOut(false)
                                    setUsername('')
                                    history.push('/user/signin')
                                },3000)
                            }
                        </div>                    
                </div>)
                :<div></div>
            } 
        </div>
    )
}

export default Header
