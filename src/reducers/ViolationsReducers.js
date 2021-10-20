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


export const currentVehicleViolationsReducer = (state = {violations:[]}, action) => {
  switch (action.type) {
    case CURRENT_VEHICLE_VIOLATIONS_REQUEST:
      return { ...state,loading: true }
    case CURRENT_VEHICLE_VIOLATIONS_SUCCESS:
      return { ...state,loading: false, violations: action.payload }
    case CURRENT_VEHICLE_VIOLATIONS_FAIL:
      return { ...state,loading: false, error: action.payload }
    default:
      return state
  }
}

export const addViolationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_VIOLATION_REQUEST:
      return { loading: true }
    case CREATE_VIOLATION_SUCCESS:
      return { loading: false, newViolation: action.payload,success:'Violation Added!' }
    case CREATE_VIOLATION_FAIL:
      return { loading: false, error: action.payload }
    case 'RESET_ADD_VIO':
      return {}
    default:
      return state
  }
}

export const getViolationReducer = (state = {violation:{}}, action) => {
  switch (action.type) {
    case GET_VIOLATION_REQUEST:
      return { ...state,loading: true }
    case GET_VIOLATION_SUCCESS:
      return { ...state,loading: false, violation: action.payload }
    case GET_VIOLATION_FAIL:
      return { ...state,loading: false, error: action.payload }

    default:
      return state
  }
}

export const payViolationReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_VIOLATION_REQUEST:
      return { loading: true }
    case PAY_VIOLATION_SUCCESS:
      return { loading: false, success: action.payload }
    case PAY_VIOLATION_FAIL:
      return { loading: false, error: action.payload }
    case 'CLEAR_PAY':
      return {}
    default:
      return state
  }
}

export const filterViolationsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTERS_VIOLATIONS_REQUEST:
      return { loading: true }
    case FILTERS_VIOLATIONS_SUCCESS:
      return { loading: false, filteredViolations: action.payload }
    case FILTERS_VIOLATIONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteViolationReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VIOLATION_REQUEST:
      return { loading: true }
    case DELETE_VIOLATION_SUCCESS:
      return { loading: false, success:'Violation Deleted!' }
    case DELETE_VIOLATION_FAIL:
      return { loading: false, error: action.payload }
    case 'RESET_DELETE_VIO':
      return {}
    default:
      return state
  }
}
export const editViolationReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_VIOLATION_REQUEST:
      return { loading: true }
    case EDIT_VIOLATION_SUCCESS:
      return { loading: false, success:'Violation Edited!' }
    case EDIT_VIOLATION_FAIL:
      return { loading: false, error: action.payload }
    case 'RESET_EDIT_VIO':
      return {}
    default:
      return state
  }
}