import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { charityReducer } from './reducers/charityReducers'
import { userLoginReducer, userRegisterReducer, userUpdateReducer, favoritesReducer} from './reducers/userReducers';
import { getAuthToken, isTokenExpired } from './utilities/auth'

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
    if (!item || item === 'undefined') {
      return null
    }
    const userInfo = JSON.parse(item)
    const token = getAuthToken(userInfo)
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('userInfo')
      return null
    }
    return userInfo
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