import React from 'react'
import './EditUserProfile.css'
import { useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {NavLink,useParams} from 'react-router-dom'
import { userEditProfile,userSignedInProfile,storedUserProfile } from '../../redux/actions/userActions'
import axios from 'axios'

const Signup = () => {
    const [username,setUsername] = useState('')
    const [age , setAge] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const [signedOut,setsignedOut] = useState(false)
    const [edit,setEdit] = useState()

    const [usernameCheck,setUsernameCheck] = useState('')
    const [ageCheck , setAgeCheck] = useState('')
    const [emailCheck , setEmailCheck] = useState('')

    useEffect(() => { 
        getSignedInUserProfile()  
    },[])

    const getSignedInUserProfile = async() =>{
        try{
            const response = await axios.get('http://localhost:8000/user/userSignedInProfile',{withCredentials : true})
            //  console.log('1',response)

            setUsername(response.data.username)
            setAge(response.data.age)
            setEmail(response.data.email)

            setUsernameCheck(response.data.username)
            setAgeCheck(response.data.age)
            setEmailCheck(response.data.email)
        }catch(err){
            setsignedOut(true)
        }
    }    

    const dispatch = useDispatch()
    const params = useParams()

    const editUser = (e) =>{
        e.preventDefault();

        if(!username || !email || !age){ 
            alert('Please Fill All The Details Correctly')
        }else{
            if(username === usernameCheck && email === emailCheck && age === ageCheck && password === ''){
                setEdit(false)
            }else{
                dispatch(userEditProfile(params.id , {username,email,age,password}));
                setEdit(true)
            }
        }
    }
    const history = useHistory()

    return (
        <div>
            {
                edit
                ?(  <div>
                        <div class="alert alert-success mx-auto" role="alert">                        
                            <div class="d-flex justify-content-center align-items-center">
                                <p>Profile Edited ! Redirecting To Your Profile Page...</p>
                                <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div style={{opacity : 0}}>
                            {setTimeout(() => {history.push('/user/profile')},3000)}
                        </div>                    
                    </div>)
                :edit === false
                ?(
                    <div>
                    <div class="alert alert-danger mx-auto" role="alert">                        
                            <div class="d-flex justify-content-center align-items-center">
                                <p>No Changes Made...</p>
                            </div>
                        </div>
                    </div>
                )
                :<div></div>
            }

            {
                signedOut
                ?(<div>
                        <div class="alert alert-danger mx-auto" role="alert">                        
                            <div class="d-flex justify-content-center align-items-center">
                                <p>User Session Timed Out ! Redirecting to Sign In...</p>
                                <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div style={{opacity : 0}}>
                            {
                                setTimeout(() => {
                                    history.push('/user/signin')
                                },3000)
                            }
                        </div>                    
                </div>)
                : (<div>
                        <div className='profile'>
                            <h3>{`${username}'s Profile`}</h3>
                        </div>
                        <div className='signup'>
                            <form>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Edit Name : </label>
                                        <input name='username' value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Name ...' />
                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleInputAge" className="form-label">Edit Age : </label>
                                        <input name='age' value={age} onChange={(e) => setAge(e.target.value)} type="number" className="form-control" id="exampleInputAge" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Age ...' />
                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Edit Email address : </label>
                                        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Email Address ...' />
                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Reset Password : </label>
                                        <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password...' />
                                    </div>

                                    <div className='blog-btn'>
                                        <NavLink exact to='/user/profile'>
                                            <button type="submit" className="btn btn-edit">Go Back</button>
                                        </NavLink>                                           
                                        <button type="submit" className="btn btn-primary mx-3" onClick={(e) => editUser(e)}>Save Edit</button>
                                    </div>
                            </form>
                        </div> 
                    </div>
                )
            }
            
        </div>
    )
}

export default Signup
