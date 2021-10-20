import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../actions/AuthActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfileScreen = ({history}) => {

    const dispatch = useDispatch()
    
    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt
    
    const vehicleProfileSt = useSelector(state => state.vehicleProfile)
    const {
            vehicle, loading,error
        } = vehicleProfileSt
    const [state, setstate] = useState({
        driver: '',
        plugedNumber: '',
        category:'',
        productionDate: '',
        registrationDate:''
    })

    useEffect(() => {
        if (!vehicleInfo) {
            history.push('/login')
        } else {
            if (!vehicle) {
                dispatch({type:'RESET_PROFILE'})
                dispatch(getProfile()) 
            } else {
                setstate(vehicle)
            }
        } 
    }, [dispatch,history,vehicleInfo,vehicle])

    return (
        <div className="home-main">
            {loading && <Loader />}
            {error && <Message variant='error'>{error}</Message>}
            <div className="violation">
                <div><h1>Vehicle Info</h1></div>
                <div><h4>Driver:</h4> <strong> {state.driver}</strong></div>
                <div><h4>Pluged Number:</h4> <strong> {state.plugedNumber}</strong></div>
                <div><h4>Category:</h4> <strong> {state.category}</strong></div>
                <div><h4>Production Date:</h4> <strong> {state.productionDate.substring(0,10)}</strong></div>
                <div><h4>Registration Date:</h4> <strong> {state.registrationDate.substring(0,10)}</strong></div>
                
            </div>
        </div>
    )
}

export default ProfileScreen
