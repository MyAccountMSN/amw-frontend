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


export const getViolationTypesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_VIOLATION_TYPES_REQUEST:
      return { loading: true }
    case GET_VIOLATION_TYPES_SUCCESS:
      return { loading: false, violationTypes: action.payload }
    case GET_VIOLATION_TYPES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addViolationTypesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VIOLATION_TYPES_REQUEST:
      return { loading: true }
    case ADD_VIOLATION_TYPES_SUCCESS:
      return { loading: false, violationType: action.payload ,success : 'Violation Type Added!' }
    case ADD_VIOLATION_TYPES_FAIL:
      return { loading: false, error: action.payload }
    case 'RESET_ADD_VIO_TYPE':
      return {}
    default:
      return state
  }
}

export const editViolationTypesReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_VIOLATION_TYPES_REQUEST:
      return { loading: true }
    case EDIT_VIOLATION_TYPES_SUCCESS:
      return { loading: false ,success : 'Violation Type edited!' }
    case EDIT_VIOLATION_TYPES_FAIL:
      return { loading: false, error: action.payload }
    case 'RESET_EDIT_VIO_TYPE':
      return {}
    default:
      return state
  }
}

export const deleteViolationTypesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_VIOLATION_TYPES_REQUEST:
      return { loading: true }
    case DELETE_VIOLATION_TYPES_SUCCESS:
      return { loading: false ,success : 'Violation Type deleted!' }
    case DELETE_VIOLATION_TYPES_FAIL:
      return { loading: false, error: action.payload }
    case 'DELETE_EDIT_VIO_TYPE':
      return {}
    default:
      return state
  }
}