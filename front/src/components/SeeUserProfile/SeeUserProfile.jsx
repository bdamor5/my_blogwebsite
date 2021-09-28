import React,{useState,useEffect} from 'react'
import './SeeUserProfile.css'
import {NavLink,useHistory} from 'react-router-dom'
import axios from 'axios'

const SeeUserProfile = () => {
    const [username,setUsername] = useState('')
    const [age , setAge] = useState('')
    const [email , setEmail] = useState('')
    const [id,setId] = useState('')

    const [signedOut,setsignedOut] = useState(false)

    const [deleted,setDeleted] = useState(false)

    const history = useHistory()

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
            setId(response.data._id)
        }catch(err){
            
            setsignedOut(true)
        }
    }
               
    const handleDelete = async() =>{
        try{
            await axios.delete(`http://localhost:8000/user/profile/delete/${id}`,{withCredentials : true})
            setDeleted(true)

        }catch(err){
            
        }
    }

    return (
        <div>
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
            :deleted
            ?(<div>
                    <div class="alert alert-success mx-auto" role="alert">                        
                        <div class="d-flex justify-content-center align-items-center">
                            <p>User Profile Deleted ! Redirecting to Sign Up...</p>
                            <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div style={{opacity : 0}}>
                        {
                            setTimeout(() => {
                                history.push('/user/signup')
                            },3000)
                        }
                    </div>                    
            </div>)
            :(  <div>
                    <div className='profile'>
                        <h3>{`${username}'s Profile`}</h3>
                    </div>

                    <div className='signup'>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Name : </label>
                                <input name='username' value={username}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled readonly/>
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputAge" className="form-label">Age : </label>
                                <input name='age' value={age}  type="number" className="form-control" id="exampleInputAge" aria-describedby="emailHelp" disabled readonly />
                            </div>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email address : </label>
                                <input name="email" value={email}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled readonly />
                            </div>

                            <div className='blog-btn'>
                                <NavLink exact to={`/user/edit-profile/${id}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                </NavLink>
                                
                                <button type="button" class="btn btn-delete" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                                </button>

                                
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">                                    
                                        <div class="modal-body d-flex justify-content-center">
                                            Do You Want To Completely Delete Your Profile?
                                        </div>
                                    <div class="modal-footer d-flex justify-content-center">
                                        <button type="button" class="btn btn-delete" onClick={handleDelete} data-bs-dismiss="modal">Yes</button>
                                        <button type="button" class="btn btn-edit" data-bs-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                            
                            </div>
                        </form>
                    </div>
                </div>
                )
        }
        </div>
    )
            
}

export default SeeUserProfile
