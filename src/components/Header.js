import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { VEHICLE_LOGOUT } from '../constants/AuthConsts'

const Header = () => {

    const dispatch = useDispatch()

    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt

    useEffect(() => {
        
    }, [])
    return (
        <header>
            <nav>
                <Link to='/'>
                    <h3>🚦 E-TrafficViolation</h3>
                </Link>
                <div className="nav-list">
                    {!vehicleInfo ? <Link to='/login'>🔑 Login</Link> : null}
                    {!vehicleInfo ? <Link to='/signup'>🔑 SignUp</Link> : null}
                    {vehicleInfo ? <Link to='/profile'>👤 Profile</Link> : null}
                    {(vehicleInfo && vehicleInfo.isAdmin) ? <Link to='/admin'>👮 Admin</Link> : null}
                    {vehicleInfo ? <Link to='/login' onClick={()=> dispatch({type:VEHICLE_LOGOUT})}>🚪🚶 LogOut</Link> : null}
                </div>
            </nav>
        </header>
    )
}

export default Header
