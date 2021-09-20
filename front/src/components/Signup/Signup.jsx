import React from 'react'
import './Signup.css'
import { useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { userSignup } from '../../redux/actions/userActions'
import {useHistory} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

const Signup = () => {

    const [user,setUser] = useState({
        username : '',
        email : '',
        age : '',
        password : ''
    })
    const response = useSelector(state => state.userReducerSignup)
    const dispatch = useDispatch()


    const updateUser = (e) =>{
        const {name,value} = e.target

        setUser({...user, [name]:value})
    }

    const signupUser = (e) =>{
        e.preventDefault();

        if(!user.username || !user.email || !user.age || !user.password){ 
            alert('Please Fill All The Details Correctly')
        }else{
            dispatch(userSignup(user));
        }
    }
    const history = useHistory()

    return (
        <div>
        {console.log(response.state)} 
            {
                response.state === 201
                ?(  <div>
                        <div class="alert alert-success mx-auto" role="alert">                        
                            <div class="d-flex justify-content-center align-items-center">
                                <p>User Created ! Redirecting to Signin Page...</p>
                                <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div style={{opacity : 0}}>
                            {setTimeout(() => {history.push('/user/signin')},3000)}
                        </div>                    
                    </div>)
                : response.state === 400
                ? (<div class="alert alert-danger" role="alert">
                        <div className='d-flex justify-content-center align-items-center'>
                            User Already exist , <NavLink exact to='/user/signin'> click here to Signin</NavLink> 
                        </div>                   
                    </div>)
                : <div></div>
            }
            {response.state = ""}
        <div className='signup'>
          <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name : </label>
                    <input name='username' value={user.username} onChange={updateUser} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Name ...' />
                </div>

                <div className="mb-3">
                    <label for="exampleInputAge" className="form-label">Age : </label>
                    <input name='age' value={user.age} onChange={updateUser} type="number" className="form-control" id="exampleInputAge" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Age ...' />
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address : </label>
                    <input name="email" value={user.email} onChange={(e) => updateUser(e)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Email Address ...' />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password : </label>
                    <input name='password' value={user.password} onChange={updateUser} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password...' />
                </div>

                <div className='signup-btn'>    
                    <button type="submit" className="btn btn-primary" onClick={(e) => signupUser(e)}>Signup</button>
                </div>
            </form>
        </div> 
        </div>
    )
}

export default Signup
