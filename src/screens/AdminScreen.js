import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { crossVehicle, getAllVehicles } from '../actions/AuthActions'
import { CROSS_VEHICLE_RESET } from '../constants/AuthConsts'
import { Link } from 'react-router-dom'

const AdminScreen = ({ history}) => {


    const dispatch = useDispatch()

    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt

    const getVehiclesSt = useSelector(state => state.getVehicles)
    const { vehicles, loading, error } = getVehiclesSt
    
    const crossVehiclesSt = useSelector(state => state.crossVehicles)
    const { success, loading:crossLoading, error:crossError } = crossVehiclesSt
    
    useEffect(() => {
        dispatch({ type: CROSS_VEHICLE_RESET })
        if (!vehicleInfo || !vehicleInfo.isAdmin) {
            history.push('/login')
        } else {
            if (!vehicles || success) {
                dispatch(getAllVehicles())
                
            } 
        }

    }, [history, vehicleInfo, dispatch, vehicles, success])
    

    
    

    return (
        <div className="home-main">
            
            {error && <Message variant="error">{error}</Message>}
            {crossLoading && <Loader />}
            {crossError && <Message variant="error">{crossError}</Message>}
            {success && <Message>{success}</Message>}
            {loading ? <Loader /> :
                <div>
                    <h1>Admin Panel</h1>
                    <br />
                    <div className="admin-nav">
                        <Link to='/admin'>Vehicles</Link>
                        <Link to='/admin/violations'>Violations</Link>
                        <Link to='/admin/violationTypes'>Violation Types</Link>
                    </div>
                    <br />
                <div>
                    <h2>Vehicles</h2>
                    <br />
                    <table className="violations-table">
                        <thead className='table-head'>
                            <tr>
                                <td>plugedNumber</td>
                                <td>driver</td>
                                <td>category</td>
                                <td>productionDate</td>
                                <td>registrationDate</td>
                                <td>isCrossOut</td>
                                <td>actions</td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            
                            {vehicles &&
                            vehicles.map(veh => 
                            
                                <tr key={veh._id}>
                                    <td>{veh.plugedNumber}</td>
                                    <td>{veh.driver}</td>
                                    <td>{veh.category}</td>
                                    <td>{veh.productionDate.substring(0,10)}</td>
                                    <td>{veh.registrationDate.substring(0,10)}</td>
                                    <td>{veh.isCrossOut ? <span>❌</span> : <span>🔲</span>}</td>
                                    <td><button onClick={() => dispatch(crossVehicle(veh._id))}>{veh.isCrossOut? ' UnCross Vehicle' : ' Cross Vehicle'}</button></td>
                                </tr>
                            
                            )
                            }
                            
                        </tbody>
                    </table>
                    
                    </div>
            </div>}
        </div>
    )
}

export default AdminScreen
