import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { charityReducer } from './reducers/charityReducers'
import { userLoginReducer, userRegisterReducer, userUpdateReducer, favoritesReducer} from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  charities: charityReducer,
  favorites: favoritesReducer
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