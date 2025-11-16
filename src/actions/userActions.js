import { USER_LOGIN_FAIL, 
        USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS, 
        USER_LOGOUT, 
        USER_REGISTER_SUCCESS, 
        USER_REGISTER_REQUEST, 
        USER_REGISTER_FAIL,
        USER_UPDATE_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_PROFILE_RESET } from "../constants/reducerConstants";
import { BACKEND_API_BASE_URL } from "../constants/apiContants";

export const login = (email, password) => async (dispatch) => {

        try{
            dispatch({type: USER_LOGIN_REQUEST})
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': email, 'password': password})
            }
            const response = await fetch(BACKEND_API_BASE_URL + 'users/login/', config)
            const data = await response.json()
            
            if (response.ok) {
                dispatch({type: USER_LOGIN_SUCCESS, payload: data})
                localStorage.setItem('userInfo', JSON.stringify(data))
            } else {
                dispatch({type: USER_LOGIN_FAIL, payload: data.detail || 'Login failed'})
            }
        }catch(error){
            dispatch({type: USER_LOGIN_FAIL, payload: error.message})
        }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const register = (firstName, lastName, email, password) => async (dispatch) => {

        try{
            dispatch({type: USER_REGISTER_REQUEST})
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email': email, 'password': password, 'first_name': firstName, 'last_name': lastName})
            }
            const response = await fetch(BACKEND_API_BASE_URL + 'users/register/', config)
            const data = await response.json()

            console.log("reponse", response)
            console.log("data", data)

            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed')
            }
            
            dispatch({type: USER_REGISTER_SUCCESS, payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
        }catch(error){
            dispatch({type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
        }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {

        try{
            dispatch({type: USER_UPDATE_REQUEST})
            
            const { userLogin: { userInfo } } = getState()
            
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(user)
            }
            const response = await fetch(BACKEND_API_BASE_URL + 'users/profile/', config)
            const data = await response.json()
            
            dispatch({type: USER_UPDATE_SUCCESS, payload: data})
            dispatch({type: USER_LOGIN_SUCCESS, payload: data}) 
            localStorage.setItem('userInfo', JSON.stringify(data)) 
        }catch(error){
            dispatch({type: USER_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    
        }
}
