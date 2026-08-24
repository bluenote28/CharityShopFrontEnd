
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
        GET_FAVORITES_ERROR,
        GET_FAVORITES_REQUEST,
        GET_FAVORITES_SUCCESS,
        ADD_FAVORITE_ERROR,
        ADD_FAVORITE_REQUEST,
        ADD_FAVORITE_SUCCESS,
        REMOVE_FAVORITE_ERROR,
        REMOVE_FAVORITE_REQUEST,
        REMOVE_FAVORITE_SUCCESS  } from "../constants/reducerConstants";
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

function favoriteAuthHeaders(userInfo, includeJsonContentType = false) {
    const headers = {
        Authorization: `Bearer ${userInfo.token}`
    }
    if (includeJsonContentType) {
        headers['Content-Type'] = 'application/json'
    }
    return headers
}

function favoriteErrorMessage(error, fallback) {
    return error.response && error.response.data.message ? error.response.data.message : (error.message || fallback)
}

export const getUserFavorites = () => async (dispatch, getState) => {
    try{
        const { userLogin: { userInfo } } = getState()
        if (!userInfo?.token) {
            return
        }

        dispatch({type: GET_FAVORITES_REQUEST})
        
        const config = {
            method: 'GET',
            headers: favoriteAuthHeaders(userInfo)
        }
        const response = await fetch(BACKEND_API_BASE_URL + 'favorites/', config)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.detail || data.message || 'Failed to load favorites')
        }
        
        dispatch({type: GET_FAVORITES_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_FAVORITES_ERROR, payload: favoriteErrorMessage(error, 'Failed to load favorites')})

    }
}

export const addFavorite = (item="", charity="") => async (dispatch, getState) => {
    try{
        const { userLogin: { userInfo } } = getState()
        if (!userInfo?.token) {
            dispatch({type: ADD_FAVORITE_ERROR, payload: 'Not logged in'})
            return
        }

        dispatch({type: ADD_FAVORITE_REQUEST, payload: { item, charity }})
        
        const config = {
            method: 'POST',
            headers: favoriteAuthHeaders(userInfo, true),
            body: JSON.stringify({'item': item, 'charity': charity})
        }
        const response = await fetch(BACKEND_API_BASE_URL + 'favorites/', config)
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.detail || data.message || 'Failed to add favorite')
        }
        
        dispatch({type: ADD_FAVORITE_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: ADD_FAVORITE_ERROR, payload: favoriteErrorMessage(error, 'Failed to add favorite')})

    }
}

export const removeFavorite = (item="", charity="") => async (dispatch, getState) => {
    try{
        const { userLogin: { userInfo } } = getState()
        if (!userInfo?.token) {
            dispatch({type: REMOVE_FAVORITE_ERROR, payload: 'Not logged in'})
            return
        }

        dispatch({type: REMOVE_FAVORITE_REQUEST, payload: { item, charity }})

        // Safari does not reliably send a body with DELETE, so pass ids as query params.
        const params = new URLSearchParams()
        if (item) {
            params.set('item', item)
        }
        if (charity) {
            params.set('charity', charity)
        }
        
        const config = {
            method: 'DELETE',
            headers: favoriteAuthHeaders(userInfo)
        }
        const url = BACKEND_API_BASE_URL + 'favorites/' + (params.toString() ? `?${params.toString()}` : '')
        const response = await fetch(url, config)
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data.detail || data.message || 'Failed to remove favorite')
        }
        dispatch({type: REMOVE_FAVORITE_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: REMOVE_FAVORITE_ERROR, payload: favoriteErrorMessage(error, 'Failed to remove favorite')})

    }
}