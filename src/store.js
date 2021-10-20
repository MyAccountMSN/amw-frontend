import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { crossVehiclesReducer, getVehiclesReducer, vehicleLoginReducer, vehicleProfileReducer, vehicleSignupReducer } from './reducers/AuthReducers'
import { addViolationReducer, currentVehicleViolationsReducer, deleteViolationReducer, editViolationReducer, filterViolationsReducer, getViolationReducer, payViolationReducer } from './reducers/ViolationsReducers'
import { addViolationTypesReducer, deleteViolationTypesReducer, editViolationTypesReducer, getViolationTypesReducer } from './reducers/ViolationTypesReducers'




const reducer = combineReducers({
    vehicleLogin: vehicleLoginReducer,
    vehicleSignup: vehicleSignupReducer,
    vehicleProfile: vehicleProfileReducer,
    currentVehicleViolations: currentVehicleViolationsReducer,
    getViolation: getViolationReducer,
    payViolation: payViolationReducer,
    getViolationTypes: getViolationTypesReducer,
    addViolation: addViolationReducer,
    addViolationTypes: addViolationTypesReducer,
    getVehicles: getVehiclesReducer,
    crossVehicles: crossVehiclesReducer,
    filterViolations: filterViolationsReducer,
    deleteViolation: deleteViolationReducer,
    editViolation: editViolationReducer,
    editViolationTypes: editViolationTypesReducer,
    deleteViolationTypes: deleteViolationTypesReducer
})


const vehicleInfoFromLocalStorge = localStorage.getItem('vehicleInfo')
    ? JSON.parse(localStorage.getItem('vehicleInfo')) : null

const initialState = {
    vehicleLogin: { vehicleInfo: vehicleInfoFromLocalStorge }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store