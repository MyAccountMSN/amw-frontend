import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentVehicleViolations } from '../actions/ViolationsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({ history }) => {
    
    const dispatch = useDispatch()

    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt

    const currentVehicleViolationsSt = useSelector(state => state.currentVehicleViolations)
    const { violations, loading, error } = currentVehicleViolationsSt
    useEffect(() => {
        if (vehicleInfo) {
            dispatch(getCurrentVehicleViolations())
        }
    }, [vehicleInfo, dispatch])
    if (!vehicleInfo) {
        return (
            <div className="home-main">
                <h1>You Need To Login First!</h1>
            </div>
        )
    } else return (
        
        <div className="home-main">
            {error && <Message variant="error">{error}</Message>}
            {loading? <Loader /> :
                <>
                <h1>My Violations</h1>  
                <table className='violations-table'>
                    <thead className='table-head'>
                        <tr >
                            <td>Date</td>
                            <td>Violation Type</td>
                            <td>isPaid</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            violations &&            
                                violations.length === 0 ?
                                <h2>No violations</h2> :
                                violations.map(vio => 
                                    <tr className='violation-row' key={vio._id}>
                                        <td>{vio.date.substring(0,10)}</td>
                                        <td>{vio.violationType.violation}</td>
                                        <td>{vio.isPaid ? <span>✔️</span> : <span>❌</span>}</td>
                                        <td><button onClick={()=>history.push(`/violations/${vio._id}`)}>🎫 View</button></td>
                                    </tr>
                                )
                        }
                        </tbody>
                </table>
                </>
            }
            
        </div>
    )
}

export default HomeScreen
