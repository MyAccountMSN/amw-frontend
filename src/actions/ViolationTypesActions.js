import axios from "axios"
import {
    ADD_VIOLATION_TYPES_FAIL,
    ADD_VIOLATION_TYPES_REQUEST,
    ADD_VIOLATION_TYPES_SUCCESS,
    DELETE_VIOLATION_TYPES_FAIL,
    DELETE_VIOLATION_TYPES_REQUEST,
    DELETE_VIOLATION_TYPES_SUCCESS,
    EDIT_VIOLATION_TYPES_FAIL,
    EDIT_VIOLATION_TYPES_REQUEST,
    EDIT_VIOLATION_TYPES_SUCCESS,
    GET_VIOLATION_TYPES_FAIL,
    GET_VIOLATION_TYPES_REQUEST,
    GET_VIOLATION_TYPES_SUCCESS
} from "../constants/ViolationTypesConsts"



export const getViolationTypes = () => async (dispatch,getState) => {
    try {
        dispatch({
            type:GET_VIOLATION_TYPES_REQUEST
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
            'https://amw-application.herokuapp.com/api/violationtypes',
            config
        )

        dispatch({
            type: GET_VIOLATION_TYPES_SUCCESS,
            payload: data,
        })
   
    } catch (error) {
        dispatch({
            type: GET_VIOLATION_TYPES_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}
export const addViolationTypes = (
    violation,
    tax
) => async (dispatch, getState) => {
    try {
        dispatch({
            type:ADD_VIOLATION_TYPES_REQUEST
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
            'https://amw-application.herokuapp.com/api/violationtypes',
            {violation,tax},
            config
        )

        dispatch({
            type: ADD_VIOLATION_TYPES_SUCCESS,
            payload: data,
        })
   
    } catch (error) {
        dispatch({
            type: ADD_VIOLATION_TYPES_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
    }

export const editViolationTypes = (
    vioTypeId,
    violation,
    tax
) => async (dispatch, getState) => {
    try {
        dispatch({
            type:EDIT_VIOLATION_TYPES_REQUEST
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
            `https://amw-application.herokuapp.com/api/violationtypes/${vioTypeId}`,
            {violation,tax},
            config
        )

        dispatch({
            type: EDIT_VIOLATION_TYPES_SUCCESS,
            payload: data,
        })
   
    } catch (error) {
        dispatch({
            type: EDIT_VIOLATION_TYPES_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
    }

export const deleteViolationTypes = (vioTypeId) => async (dispatch,getState) => {
    try {
        dispatch({
            type:DELETE_VIOLATION_TYPES_REQUEST
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
            `https://amw-application.herokuapp.com/api/violationtypes/${vioTypeId}`,
            config
        )

        dispatch({
            type: DELETE_VIOLATION_TYPES_SUCCESS,
            payload: data,
        })
   
    } catch (error) {
        dispatch({
            type: DELETE_VIOLATION_TYPES_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
    
}