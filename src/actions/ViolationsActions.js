import axios from "axios"
import {
    CREATE_VIOLATION_FAIL,
    CREATE_VIOLATION_REQUEST,
    CREATE_VIOLATION_SUCCESS,
    CURRENT_VEHICLE_VIOLATIONS_FAIL,
    CURRENT_VEHICLE_VIOLATIONS_REQUEST,
    CURRENT_VEHICLE_VIOLATIONS_SUCCESS,
    DELETE_VIOLATION_FAIL,
    DELETE_VIOLATION_REQUEST,
    DELETE_VIOLATION_SUCCESS,
    EDIT_VIOLATION_FAIL,
    EDIT_VIOLATION_REQUEST,
    EDIT_VIOLATION_SUCCESS,
    FILTERS_VIOLATIONS_FAIL,
    FILTERS_VIOLATIONS_REQUEST,
    FILTERS_VIOLATIONS_SUCCESS,
    GET_VIOLATION_FAIL,
    GET_VIOLATION_REQUEST,
    GET_VIOLATION_SUCCESS,
    PAY_VIOLATION_FAIL,
    PAY_VIOLATION_REQUEST,
    PAY_VIOLATION_SUCCESS
} from "../constants/ViolationsConsts"


export const getCurrentVehicleViolations = () => async (dispatch,getState) => {
    try {

        dispatch({
            type:CURRENT_VEHICLE_VIOLATIONS_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        const config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }

        const { data } = await axios.get(
            'https://amw-application.herokuapp.com/api/violations',
            config
        )


        dispatch({
            type: CURRENT_VEHICLE_VIOLATIONS_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: CURRENT_VEHICLE_VIOLATIONS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}
export const getVehicleViolation = (violationId) => async (dispatch,getState) => {
    try {

        dispatch({
            type:GET_VIOLATION_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        const config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }

        const { data } = await axios.get(
            `https://amw-application.herokuapp.com/api/violations/violation/${violationId}`,
            config
        )


        dispatch({
            type: GET_VIOLATION_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: GET_VIOLATION_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}
export const payViolation = (violationId) => async (dispatch,getState) => {
    try {

        dispatch({
            type:PAY_VIOLATION_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        const config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }

        const { data } = await axios.get(
            `https://amw-application.herokuapp.com/api/violations/${violationId}/pay`,
            config
        )


        dispatch({
            type: PAY_VIOLATION_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: PAY_VIOLATION_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}
export const addViolation = (
    violationType,
    plugedNumber,
    date,
    location,) => async (dispatch, getState) => {
        
    try {

        dispatch({
            type:CREATE_VIOLATION_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        const config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }

        const { data } = await axios.post(
            `https://amw-application.herokuapp.com/api/violations/`,
            {violationType,
            plugedNumber,
            date,
            location},
            config
        )


        dispatch({
            type: CREATE_VIOLATION_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: CREATE_VIOLATION_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const filterViolations = (
    plugedNumber,
    location,
    startDate,
    endDate) => async (dispatch, getState) => {
        
    try {

        dispatch({
            type:FILTERS_VIOLATIONS_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        var config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }


        var plugedNumberP =plugedNumber? plugedNumber :''
        var locationP = location ? location : ''
        var startDateP = ''
        var endDateP = ''
        if (startDate && endDate) {
            startDateP = startDate
            endDateP=endDate 
        }



        

        const { data } = await axios.get(
            `https://amw-application.herokuapp.com/api/violations/filters/query?location=${locationP}&plugedNumber=${plugedNumberP}&startDate=${startDateP}&endDate=${endDateP}`,
            config 
        )


        dispatch({
            type: FILTERS_VIOLATIONS_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: FILTERS_VIOLATIONS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
    }

export const deleteViolation = (violationId) => async (dispatch,getState) => {
    try {

        dispatch({
            type:DELETE_VIOLATION_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        const config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }

        const { data } = await axios.delete(
            `https://amw-application.herokuapp.com/api/violations/violation/${violationId}`,
            config
        )


        dispatch({
            type: DELETE_VIOLATION_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: DELETE_VIOLATION_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const editViolation = (violationId, plugedNumber,violationType,date,location) => async (dispatch,getState) => {
    try {

        dispatch({
            type:EDIT_VIOLATION_REQUEST
        })
        

        const {
            vehicleLogin: { vehicleInfo }
        } = getState()
        
        const config = {
            headers: {
                'Authorization': `Bearer ${vehicleInfo.token}`
            },
        }

        const { data } = await axios.put(
            `https://amw-application.herokuapp.com/api/violations/violation/${violationId}`,
            {plugedNumber,violationType,date,location},
            config
        )


        dispatch({
            type: EDIT_VIOLATION_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: EDIT_VIOLATION_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}