import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addViolationTypes, deleteViolationTypes, editViolationTypes, getViolationTypes } from '../actions/ViolationTypesActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminViolationTypesScreen = ({ history }) => {

    const dispatch = useDispatch()

    const vehicleLoginSt = useSelector(state => state.vehicleLogin)
    const { vehicleInfo } = vehicleLoginSt

    const getViolationTypesSt = useSelector(state => state.getViolationTypes)
    const { violationTypes, loading, error } = getViolationTypesSt

    const addViolationTypesSt = useSelector(state => state.addViolationTypes)
    const { loading: addingVTLoading, error: addingVTError, success: VTsuccess } = addViolationTypesSt
    
    const editViolationTypesSt = useSelector(state => state.editViolationTypes)
    const { loading: editingVTLoading, error: editingVTError, success: editingVTsuccess } = editViolationTypesSt
    
    const deleteViolationTypesSt = useSelector(state => state.deleteViolationTypes)
    const { loading: deleteingVTLoading, error: deleteingVTError, success: deleteingVTsuccess } = deleteViolationTypesSt
    

    const [VT, setVT] = useState({
        violation: '',
        tax: ''
    })
    const [eVT, seteVT] = useState({
        violation: '',
        tax: '',
        vioId: ''
    })
    
    useEffect(() => {
        if (!vehicleInfo || !vehicleInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch({ type:'RESET_EDIT_VIO_TYPE' })
            dispatch({ type: 'RESET_DELETE_VIO_TYPE' })
            dispatch({type:'RESET_ADD_VIO_TYPE'})
            dispatch(getViolationTypes())
        }
    }, [history, vehicleInfo, dispatch])

    useEffect(() => {
        if (deleteingVTsuccess || editingVTsuccess || VTsuccess) {
            dispatch(getViolationTypes())
        }
    }, [dispatch,deleteingVTsuccess,editingVTsuccess,VTsuccess])
    
    const onChangeHandler2 = (e) => {
        setVT({ ...VT, [e.target.name]: e.target.value })
        dispatch({ type:'RESET_EDIT_VIO_TYPE' })
        dispatch({ type: 'RESET_DELETE_VIO_TYPE' })
        dispatch({type:'RESET_ADD_VIO_TYPE'})
    }
    const onChangeHandler1 = (e) => {
        seteVT({ ...eVT, [e.target.name]: e.target.value })
        dispatch({ type:'RESET_EDIT_VIO_TYPE' })
        dispatch({ type: 'RESET_DELETE_VIO_TYPE' })
        dispatch({type:'RESET_ADD_VIO_TYPE'})
    }


    const onSubmitHandler2 = (e) => {
        e.preventDefault()
        dispatch(addViolationTypes(
            VT.violation,
            VT.tax,
        ))
        document.getElementById('addVT').reset()

    }
    const onSubmitHandler1 = (e) => {
        e.preventDefault()
        dispatch(editViolationTypes(
            eVT.vioId,
            eVT.violation,
            eVT.tax,
        ))
        document.getElementById('eVT').reset()

    }
    return (
        <div className='home-main full-width'>
            <h1>Admin Panel</h1>
                    <br />
                    <div className="admin-nav">
                        <Link to='/admin'>Vehicles</Link>
                        <Link to='/admin/violations'>Violations</Link>
                        <Link to='/admin/violationTypes'>Violation Types</Link>
                    </div>
            <br />
            {loading && <Loader />}
            {error && <Message variant='error'>{error}</Message>}
            {addingVTLoading && <Loader />}
            {addingVTError && <Message variant='error'>{addingVTError}</Message>}
            {VTsuccess && <Message>{VTsuccess}</Message>}
            {editingVTLoading && <Loader />}
            {editingVTError && <Message variant='error'>{editingVTError}</Message>}
            {editingVTsuccess && <Message>Edited Successfuly!</Message>}
            {deleteingVTLoading && <Loader />}
            {deleteingVTError && <Message variant='error'>{deleteingVTError}</Message>}
            {deleteingVTsuccess && <Message>Deleted Successfuly!</Message>}
            <div className='forms-row'>
                
                
                <form onSubmit={onSubmitHandler2} id='addVT'>
                    <h3>Add Violation Type</h3>
                    <div>
                        <label>Violation</label>
                        <br />
                        <input type="text" name="violation" placeholder="Violation" onChange={onChangeHandler2} required/>
                    </div>
                    <div>
                        <label>Tax</label>
                        <br />
                        <input type="text" name="tax" placeholder="Tax" onChange={onChangeHandler2} required/>
                    </div>
                    <div>
                        <button type="submit">Add</button>
                    </div>
                </form>
                <form onSubmit={onSubmitHandler1} id='eVT'>
                    <h3>Edit Violation Type</h3>
                    <div>
                        <label>Violation</label>
                        <br />
                        <input type="text" name="violation" value={eVT.violation} placeholder="Violation" onChange={onChangeHandler1} required/>
                    </div>
                    <div>
                        <label>Tax</label>
                        <br />
                        <input type="text" name="tax" value={eVT.tax} placeholder="Tax" onChange={onChangeHandler1} required/>
                    </div>
                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
            <br />
            <h2>Violation Types</h2>
            <br />
            <table className='full-width'>
                    <thead className="table-head">
                        <tr>
                            <td>violation</td>
                            <td>tax</td>
                            <td>actions</td>
                        </tr>
                    </thead>
                    
                    <tbody>  
                        { violationTypes &&
                            violationTypes.map(vio => 
                                <tr key={vio._id}>
                                    <td>{vio.violation}</td>
                                    <td>${vio.tax}</td>
                                    <td>
                                        <button onClick={() => seteVT({
                                            vioId:vio._id,
                                            violation: vio.violation,
                                            tax: vio.tax,
                                        })}>Edit</button>
                                        <button onClick={() => dispatch(deleteViolationTypes(vio._id))}>Delete</button>
                                    </td>
                                </tr>
                            
                            )
                        }
                        
                    </tbody>
                </table>
        </div>
    )
}

export default AdminViolationTypesScreen
