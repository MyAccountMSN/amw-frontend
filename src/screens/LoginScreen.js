import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/AuthActions'
import { Link } from 'react-router-dom'
import Message from '../components/Message'

const LoginScreen = ({history}) => {
    
    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo,error } = vehicleLoginSt

    const dispatch = useDispatch()
    const [state, setState] = useState({ driver: '', plugedNumber: '' })
    const onChangeHandler=(e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(state.driver,state.plugedNumber))
    }


    useEffect(() => {
        if(vehicleInfo) {
            history.push('/')
        }
    }, [vehicleInfo,history])
    
    return (
        <div className="login-main">
            <form onSubmit={onSubmitHandler} >
                <h2>Login</h2>
                {error && <Message variant='error'>{error}</Message>}
                <div>
                    <label>Driver</label>
                    <br />
                    <input type="text" name="driver" required placeholder="Driver" onChange={onChangeHandler}/>
                </div>
                <div>
                    <label>Pluged Number</label>
                    <br />
                    <input type="text" name="plugedNumber" required placeholder="Pluged Number" onChange={onChangeHandler}/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    <small>don't have an account?<Link to='/signup' style={{color: 'grey'}}> Press Here to SignUp!</Link></small>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen
