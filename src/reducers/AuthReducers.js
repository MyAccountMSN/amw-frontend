import {
  CROSS_VEHICLE_FAIL,
  CROSS_VEHICLE_REQUEST,
  CROSS_VEHICLE_RESET,
  CROSS_VEHICLE_SUCCESS,
  GET_ALL_VEHICLES_FAIL,
  GET_ALL_VEHICLES_REQUEST,
  GET_ALL_VEHICLES_SUCCESS,
  VEHICLE_LOGIN_FAIL,
  VEHICLE_LOGIN_REQUEST,
  VEHICLE_LOGIN_SUCCESS,
  VEHICLE_LOGOUT,
  VEHICLE_PROFILE_FAIL,
  VEHICLE_PROFILE_REQUEST,
  VEHICLE_PROFILE_SUCCESS,
  VEHICLE_SIGNUP_FAIL,
  VEHICLE_SIGNUP_REQUEST,
  VEHICLE_SIGNUP_SUCCESS,
} from '../constants/AuthConsts'


export const vehicleSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_SIGNUP_REQUEST:
      return { loading: true }
    case VEHICLE_SIGNUP_SUCCESS:
      return { loading: false, success:true }
    case VEHICLE_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    case VEHICLE_LOGOUT:
      localStorage.removeItem('vehicleInfo')
      return {}
    default:
      return state
  }
}

export const vehicleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_LOGIN_REQUEST:
      return { loading: true }
    case VEHICLE_LOGIN_SUCCESS:
      return { loading: false, vehicleInfo: action.payload }
    case VEHICLE_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case VEHICLE_LOGOUT:
      return {}
    default:
      return state
  }
}

export const vehicleProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case VEHICLE_PROFILE_REQUEST:
      return { loading: true }
    case VEHICLE_PROFILE_SUCCESS:
      return { loading: false, vehicle: action.payload }
    case VEHICLE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case 'RESET_PROFILE':
      return { }
    default:
      return state
  }
}

export const getVehiclesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_VEHICLES_REQUEST:
      return { loading: true }
    case GET_ALL_VEHICLES_SUCCESS:
      return { loading: false, vehicles: action.payload }
    case GET_ALL_VEHICLES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const crossVehiclesReducer = (state = {}, action) => {
  switch (action.type) {
    case CROSS_VEHICLE_REQUEST:
      return { loading: true }
    case CROSS_VEHICLE_SUCCESS:
      return { loading: false, success: "Success!" }
    case CROSS_VEHICLE_FAIL:
      return { loading: false, error: action.payload }
    case CROSS_VEHICLE_RESET:
      return {}
    default:
      return state
  }
}

