import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicleViolation, payViolation } from '../actions/ViolationsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ViolationScreen = ({ history, match }) => {
    
    const violationId = match.params.id

    const dispatch = useDispatch()
    
    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt

    const payViolationSt = useSelector(state => state.payViolation)
    const { loading:payingLoading , success , error:payingError } = payViolationSt
    
    const getViolationSt = useSelector(state => state.getViolation)
    const {
        violation, loading, error
    } = getViolationSt
    useEffect(() => {
        if (!vehicleInfo) {
            history.push('/login')
        } else {
            dispatch({type:'CLEAR_PAY'})
            dispatch(getVehicleViolation(violationId))
        } 
    }, [dispatch, history, vehicleInfo, violationId])
    useEffect(() => {
        if (success) {
            dispatch(getVehicleViolation(violationId))
        }
    }, [success,dispatch,violationId])

    return (

        <div className='home-main'>
            {loading && <Loader />}
            {error && <Message variant='error'>{error}</Message>}
            {!violation.violationType ?  <Loader /> :
                <div className='violation'>
                    <h1>Violation Info</h1>
                    <div>
                        <h3>Violation Type:</h3> <strong> {violation.violationType.violation}</strong>
                    </div>
                    <div>
                        <h3>Violation Tax:</h3> <strong> ${violation.violationType.tax}</strong>
                    </div>
                    <div>
                        <h3>Date:</h3> <strong> {violation.date.substring(0,10)}</strong>
                    </div>
                    <div>
                        <h3>Location:</h3> <strong> {violation.location}</strong>
                    </div>
                    <div>
                        <h3>isPaid:</h3> <strong> {violation.isPaid ? <span>✔️</span> : <span>❌</span>}</strong></div>
                    {payingLoading && <Loader />}
                    {success && <Message>Payed Successfuly!</Message>}
                    {payingError && <Message variant='error'>{payingError}</Message>}
                    <div>
                        {!violation.isPaid &&
                        <button  onClick={() => { dispatch(payViolation(violationId)) }}>Pay Violation online</button>
                        }
                    </div>
                    
                </div>
            }
        </div>
    )
}

export default ViolationScreen
