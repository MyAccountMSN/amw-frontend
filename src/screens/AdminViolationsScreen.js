import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getViolationTypes } from '../actions/ViolationTypesActions'
import { addViolation as addVio, deleteViolation, editViolation, filterViolations } from '../actions/ViolationsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const AdminViolationsScreen = ({ history }) => {

    const dispatch = useDispatch()

    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt

    const getViolationTypesSt = useSelector(state => state.getViolationTypes)
    const { violationTypes, loading, error} = getViolationTypesSt

    const addViolationSt = useSelector(state => state.addViolation)
    const {loading: addingLoading, error: addingError, success } = addViolationSt

    const filterViolationsSt = useSelector(state => state.filterViolations)
    const { filteredViolations, loading: filteringLoading, error: filteringError } = filterViolationsSt
    
    const deleteViolationSt = useSelector(state => state.deleteViolation)
    const { success:deleteingSuccess, loading: deleteingLoading, error: deleteingError } = deleteViolationSt
    
    const editViolationSt = useSelector(state => state.editViolation)
    const { success:editingSuccess, loading: editingLoading, error: editingError } = editViolationSt
    

    

    const [state, setstate] = useState({
        plugedNumber: '',
        violationType: '',
        date: '',
        location: '',
    })

    const [filters, setfilters] = useState({
        plugedNumber: '',
        startDate: '',
        endDate: '',
        location: '',
    })

    const [edit, setedit] = useState({
        vioId:'',
        plugedNumber: '',
        violation: '',
        date: '',
        location: '',

    })

    
    useEffect(() => {
        if (!vehicleInfo || !vehicleInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch({type:'RESET_ADD_VIO'}) 
            dispatch({ type:'RESET_EDIT_VIO' })
            dispatch({type:'RESET_DELETE_VIO'}) 
            dispatch(getViolationTypes())
            dispatch(filterViolations(null,null,null,null))
        }
    }, [history, vehicleInfo, dispatch])

    useEffect(() => {
        if (deleteingSuccess || editingSuccess || success) {
            dispatch(filterViolations(null,null,null,null))
        }
    }, [ deleteingSuccess, dispatch , editingSuccess,success])
    
    const onChangeHandler = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
        dispatch({type:'RESET_ADD_VIO'}) 
        dispatch({ type:'RESET_EDIT_VIO' })
        dispatch({type:'RESET_DELETE_VIO'}) 
    }

    const onChangeHandler1 = (e) => {
        setfilters({ ...filters, [e.target.name]: e.target.value })
        dispatch({type:'RESET_ADD_VIO'}) 
        dispatch({ type:'RESET_EDIT_VIO' })
        dispatch({type:'RESET_DELETE_VIO'}) 
    }

    const onChangeHandler2 = (e) => {
        setedit({ ...edit, [e.target.name]: e.target.value })
        dispatch({type:'RESET_ADD_VIO'}) 
        dispatch({ type:'RESET_EDIT_VIO' })
        dispatch({type:'RESET_DELETE_VIO'}) 
        
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(addVio(
            state.violationType,
            state.plugedNumber,
            state.date,
            state.location,
        ))
        document.getElementById('addVio').reset()

    }

    const onSubmitHandler1 = (e) => {
        e.preventDefault()
        dispatch(filterViolations(
            filters.plugedNumber,
            filters.location,
            filters.startDate,
            filters.endDate,
        ))
        document.getElementById('filterVio').reset()
        setfilters({
            plugedNumber:null,
            location:null,
            startDate:null,
            endDate:null
        })

    }

    const onSubmitHandler2 = (e) => {
        e.preventDefault()
        dispatch(editViolation(
            edit.vioId,
            edit.plugedNumber,
            edit.violation,
            edit.date,
            edit.location,
            
        ))
        document.getElementById('editVio').reset()

    }

    return (
        <div className="home-main full-width">
            {filteringLoading && <Loader />}
            {filteringError && <Message variant="error">{filteringError}</Message>}
            {addingLoading && <Loader />}
            {addingError && <Message variant="error">{addingError}</Message>}
            {success && <Message>{success}</Message>}
            {deleteingLoading && <Loader />}
            {deleteingError && <Message variant="error">{deleteingError}</Message>}
            {deleteingSuccess && <Message>{deleteingSuccess}</Message>}
            {editingLoading && <Loader />}
            {editingError && <Message variant="error">{editingError}</Message>}
            {editingSuccess && <Message>{editingSuccess}</Message>}
            <h1>Admin Panel</h1>
                    <br />
                    <div className="admin-nav">
                        <Link to='/admin'>Vehicles</Link>
                        <Link to='/admin/violations'>Violations</Link>
                        <Link to='/admin/violationTypes'>Violation Types</Link>
                    </div>
                    <br />
            <div className='forms-row'>
                <form onSubmit={onSubmitHandler} id='addVio'>
                    <h3>Add Violation</h3>
                    <div>
                        <label>Pluged Number</label>
                        <br />
                        <input type="number" name="plugedNumber" placeholder="Pluged Number" onChange={onChangeHandler} required/>
                    </div>
                    <div>
                        <label>Violation Type</label>
                        <br />
                        <select placeholder='Violation Type' required name="violationType" onChange={onChangeHandler}>
                            <option disabled selected>Choose Violation Type</option>
                            {loading && <Loader />}
                            {error && <Message variant='error'>{error}</Message>}
                            {violationTypes && violationTypes.map(vioTyp => 
                                <option value={vioTyp._id} key={vioTyp._id}>{vioTyp.violation}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Date</label>
                        <br />
                        <input type="date" name="date" placeholder="Date"  onChange={onChangeHandler} required/>
                    </div>
                    <div>
                        <label>Location</label>
                        <br />
                        <input type="text" name="location" placeholder="Location" onChange={onChangeHandler} required/>
                    </div>
                    <div>
                        <button type="submit">Add Violation</button>
                    </div>
                    
                </form>
            
                <form onSubmit={onSubmitHandler1} id='filterVio' >
                    <h3>Filter Violations</h3>
                    <div>
                        <label>plugedNumber</label>
                        <br />
                        <input type="number" name="plugedNumber" placeholder="plugedNumber"  onChange={onChangeHandler1} />
                    </div>
                    <div>
                        <label>Location</label>
                        <br />
                        <input type="text" name="location" placeholder="location"  onChange={onChangeHandler1} />
                    </div>
                    <div>
                        <label>Start Date</label>
                        <br />
                        <input type="date" name="startDate" placeholder="Start Date"  onChange={onChangeHandler1} />
                    </div>
                    <div>
                        <label>End Date</label>
                        <br />
                        <input type="date" name="endDate" placeholder="End Date"  onChange={onChangeHandler1} />
                    </div>
                    <div>
                        <button type="submit">Filter</button>
                    </div>
                    
                </form>
                
                <form onSubmit={onSubmitHandler2} id='editVio'>
                <h3>Edit Violation</h3>
                    <div>
                        <label>plugedNumber</label>
                        <br />
                        <input type="number" name="plugedNumber" value={edit.plugedNumber} placeholder="plugedNumber"  onChange={onChangeHandler2} />
                    </div>
                    <div>
                        <label>Violation Type</label>
                        <br />
                        <select placeholder='Violation Type' required name="violation" value={edit.violation} onChange={onChangeHandler2}>
                            <option disabled selected>Choose Violation Type</option>
                            {loading && <Loader />}
                            {error && <Message variant='error'>{error}</Message>}
                            {violationTypes && violationTypes.map(vioTyp => 
                                <option value={vioTyp._id} key={vioTyp._id}>{vioTyp.violation}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Date</label>
                        <br />
                        <input type="date" name="date" placeholder="Date" value={edit.date}  onChange={onChangeHandler2} />
                    </div>
                    <div>
                        <label>Location</label>
                        <br />
                        <input type="text" name="location" placeholder="location" value={edit.location}  onChange={onChangeHandler2} />
                    </div>
                    <div>
                        <button type="submit">Edit</button>
                    </div>
                </form>
            </div>
            <h2>Violations</h2>
            <br />
                <table className='full-width'>
                    <thead className="table-head">
                        <tr>
                            <td>plugedNumber</td>
                            <td>location</td>
                            <td>type</td>
                            <td>tax</td>
                            <td>date</td>
                            <td>isPaid</td>
                            <td>actions</td>
                        </tr>
                    </thead>
                    
                    <tbody>
                        
                        {filteredViolations &&
                            filteredViolations.map(vio => 
                                <tr key={vio._id}>
                                    <td>{vio.plugedNumber}</td>
                                    <td>{vio.location}</td>
                                    <td>{vio.violationType.violation}</td>
                                    <td>${vio.violationType.tax}</td>
                                    <td>{vio.date.substring(0,10)}</td>
                                    <td>{vio.isPaid ? <span>✔️</span> : <span>❌</span>}</td>
                                    <td>
                                        <button onClick={() => setedit({
                                            vioId:vio._id,
                                            plugedNumber: vio.plugedNumber,
                                            violation: vio.violationType._id,
                                            date: vio.date.substring(0,10),
                                            location: vio.location,
                                        })}>Edit</button>
                                        <button onClick={() => dispatch(deleteViolation(vio._id))}>Delete</button>
                                    </td>
                                </tr>
                            
                            )
                        }
                        
                    </tbody>
                </table>
            
            
        </div>
    )
}

export default AdminViolationsScreen
