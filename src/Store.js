import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { itemsReducer } from './reducers/itemReducers'
import { userLoginReducer, userRegisterReducer, userUpdateReducer} from './reducers/userReducers';

const reducer = combineReducers({
  items: itemsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer
})

const middleware = [thunk]

const userInfoFromStorage = (() => {
  try {
    const item = localStorage.getItem('userInfo')
    return item && item !== 'undefined' ? JSON.parse(item) : null
  } catch (error) {
    return null
  }
})()

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({ 
  reducer, 
  middleware: () => middleware,
  preloadedState: initialState 
})

export default store