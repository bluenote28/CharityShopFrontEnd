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
            
            if (response.ok) {
                const data = await response.json()
                dispatch({type: USER_LOGIN_SUCCESS, payload: data})
                localStorage.setItem('userInfo', JSON.stringify(data))
            } else {
                let errorMessage = 'Login failed'
                try {
                    const data = await response.json()
                    errorMessage = data.detail || data.message || errorMessage
                } catch {
                    errorMessage = `Server error: ${response.status}`
                }
                dispatch({type: USER_LOGIN_FAIL, payload: errorMessage})
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
            
            console.log('Registration request:', BACKEND_API_BASE_URL + 'users/register/', config)
            const response = await fetch(BACKEND_API_BASE_URL + 'users/register/', config)
            console.log('Registration response status:', response.status)

            if (!response.ok) {
                let errorMessage = 'Registration failed'
                try {
                    const data = await response.json()
                    console.log('Error response data:', data)
                    errorMessage = data.detail || data.message || errorMessage
                } catch (parseError) {
                    console.log('Failed to parse error response:', parseError)
                    const text = await response.text()
                    console.log('Raw error response:', text)
                    errorMessage = `Server error: ${response.status}`
                }
                throw new Error(errorMessage)
            }
            
            const data = await response.json()
            
            dispatch({type: USER_REGISTER_SUCCESS, payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
        }catch(error){
            console.log('Registration error:', error)
            dispatch({type: USER_REGISTER_FAIL, payload: error.message})
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
