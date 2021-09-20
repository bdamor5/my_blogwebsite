import React,{useState} from 'react'
import './Signin.css'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { userSignin,userSignedInProfile } from '../../redux/actions/userActions'

const Signin = () => {

    const [user,setUser] = useState({
        email : "",
        password : ""
    })

    const dispatch = useDispatch()

    const response = useSelector(state => state.userReducerSignin)

    const handleChange = (e) =>{
        const {name,value} = e.target
        setUser({...user , [name]:value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log(user)

        if(!user.email || !user.password){ 
            alert('Please Fill All The Details Correctly')
        }else{
            dispatch(userSignin(user));
        }
    }

    const history = useHistory()

    return (
        <div>
        {/* {console.log(response.state)}    */}
        {
            response.state === 400
            ? (<div class="alert alert-danger" role="alert">
                        <div className='d-flex justify-content-center align-items-center'>
                            Invalid Signin Details ! Please Try Again.
                        </div>                   
                </div>)
            : response.state === 200
            ? (<div>
                        <div class="alert alert-success mx-auto" role="alert">                        
                            <div class="d-flex justify-content-center align-items-center">
                                <p>User Signed In Successfully ! Redirecting to Home Page...</p>
                                <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
                            </div>
                        </div>
                        <div style={{opacity : 0}}>
                            {
                            setTimeout(() => {

                                dispatch(userSignedInProfile())
                                //we have to add this dispatch when we signin ,to store 
                                //user info in redux store so that when we redirect to home page 
                                //we already have the user data present and 
                                //we can extract it via useSelector
                                //We can also access user data in other pages via useSelector

                                history.push('/')
                                },3000)
                            }
                        </div>                    
                    </div>)
            : <div></div>
        }
        {response.state = ""}
        <div className='signin'>
          <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address : </label>
                    <input name="email" value={user.email} onChange={(e) => handleChange(e)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="off" placeholder='Enter Your Email Address ...'/>
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password : </label>
                    <input name="password" value={user.password} onChange={(e) => handleChange(e)} type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter Your Password...'/>
                </div>

                <div className='signin-btn'>    
                    <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary">Signin</button>
                </div>
            </form>
        </div> 
        </div>
    )
}

export default Signin
