import axios from 'axios'
import {
    CROSS_VEHICLE_FAIL,
    CROSS_VEHICLE_REQUEST,
    CROSS_VEHICLE_SUCCESS,
    GET_ALL_VEHICLES_FAIL,
    GET_ALL_VEHICLES_REQUEST,
    GET_ALL_VEHICLES_SUCCESS,
    VEHICLE_LOGIN_FAIL,
    VEHICLE_LOGIN_REQUEST,
    VEHICLE_LOGIN_SUCCESS,
    VEHICLE_PROFILE_FAIL,
    VEHICLE_PROFILE_REQUEST,
    VEHICLE_PROFILE_SUCCESS,
    VEHICLE_SIGNUP_FAIL,
    VEHICLE_SIGNUP_REQUEST,
    VEHICLE_SIGNUP_SUCCESS
} from '../constants/AuthConsts'


export const login = (driver, plugedNumber) => async (dispatch) => {

    try {
        dispatch({
            type:VEHICLE_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            'https://amw-application.herokuapp.com/api/vehicles/login',
            { driver, plugedNumber },
            config
        )

        localStorage.setItem('vehicleInfo', JSON.stringify(data))

        dispatch({
            type: VEHICLE_LOGIN_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: VEHICLE_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const signup = (
    plugedNumber,
    driver,
    category,
    productionDate,
    registrationDate
) => async (dispatch) => {
    try {
        dispatch({
            type:VEHICLE_SIGNUP_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            'https://amw-application.herokuapp.com/api/vehicles/signup',
            {
                plugedNumber,
                driver,
                category,
                productionDate,
                registrationDate
            },
            config
        )
        
        dispatch({
            type: VEHICLE_SIGNUP_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: VEHICLE_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
    }

export const getProfile = () => async (dispatch,getState) => {
    try {

        dispatch({
            type:VEHICLE_PROFILE_REQUEST
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
            'https://amw-application.herokuapp.com/api/vehicles/currentVehicle',
            config
        )


        dispatch({
            type: VEHICLE_PROFILE_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: VEHICLE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const getAllVehicles = () => async (dispatch,getState) => {
    try {

        dispatch({
            type:GET_ALL_VEHICLES_REQUEST
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
            'https://amw-application.herokuapp.com/api/vehicles',
            config
        )


        dispatch({
            type: GET_ALL_VEHICLES_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: GET_ALL_VEHICLES_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}

export const crossVehicle = (vehicleId) => async (dispatch,getState) => {
    try {

        dispatch({
            type:CROSS_VEHICLE_REQUEST
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
            `https://amw-application.herokuapp.com/api/vehicles/${vehicleId}/cross`,
            config
        )


        dispatch({
            type: CROSS_VEHICLE_SUCCESS,
            payload: data,
        })

        
    } catch (error) {
        dispatch({
            type: CROSS_VEHICLE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}