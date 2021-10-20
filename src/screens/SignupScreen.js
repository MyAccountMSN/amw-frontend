import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup } from '../actions/AuthActions'
import Message from '../components/Message'
import { VEHICLE_LOGOUT } from '../constants/AuthConsts'

const SignupScreen=({ history})=>{


    const dispatch = useDispatch()
    const vehicleSignupSt = useSelector(state => state.vehicleSignup)
    const { error ,success } = vehicleSignupSt

    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt
    
    const [state, setState] = useState({
        driver: '',
        plugedNumber: '',
        category:'',
        productionDate:'',
        registrationDate:''
    })
    const onChangeHandler=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(signup(
            state.plugedNumber,
            state.driver,
            state.category,
            state.productionDate,
            state.registrationDate,
        ))
    }

    useEffect(() => {
        dispatch({type:VEHICLE_LOGOUT})
        if(vehicleInfo) {
            history.push('/')
        } else if (success) {
            history.push('/login')
        }
        
    }, [vehicleInfo,history,success,dispatch])
    
    return (
        <div className="login-main signup-main">
            <form onSubmit={onSubmitHandler} >
                <h2>SignUp</h2>
                {error && <Message variant='error'>{error}</Message>}
                <div>
                    <label>Driver</label>
                    <br />
                    <input type="text" name="driver" required placeholder="Driver" onChange={onChangeHandler}/>
                </div>
                <div>
                    <label>Pluged Number</label>
                    <br />
                    <input type="number" name="plugedNumber" required placeholder="Pluged Number" onChange={onChangeHandler}/>
                </div>
                <div>
                    <label>Category</label>
                    <br />
                    <input type="text" name="category" required placeholder="Category" onChange={onChangeHandler}/>
                </div>
                <div>
                    <label>Production Date</label>
                    <br />
                    <input type="date" name="productionDate" required placeholder="Production Date" onChange={onChangeHandler}/>
                </div>
                <div>
                    <label>Registration Date</label>
                    <br />
                    <input type="date" name="registrationDate" required placeholder="Registration Date" onChange={onChangeHandler}/>
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
                <div>
                    <small>already have an account?<Link to='/login' style={{color: 'grey'}}> Press Here to LogIn!</Link></small>
                </div>
                
            </form>
        </div>
    )
}

export default SignupScreen
