import { BACKEND_API_BASE_URL } from '../constants/apiContants'
import { GET_CHARITIES_REQUEST, GET_CHARITIES_ERROR, GET_CHARITIES_SUCCESS, DELETE_CHARITY_ERROR, DELETE_CHARITY_REQUEST, 
    DELETE_CHARITY_SUCCESS, ADD_CHARITY_ERROR, ADD_CHARITY_REQUEST, ADD_CHARITY_SUCCESS, UPDATE_CHARITY_ERROR,
    UPDATE_CHARITY_REQUEST, UPDATE_CHARITY_SUCCESS } from '../constants/reducerConstants'

export const getCharities = () => async(dispatch) => {
    try{
        dispatch({type: GET_CHARITIES_REQUEST})
        
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
         const response = await fetch(BACKEND_API_BASE_URL + 'charity/getCharities', config)
         const data = await response.json()
        dispatch({type: GET_CHARITIES_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_CHARITIES_ERROR, error: error})
    }
}

export const deleteCharity = (id) => async(dispatch, getState) => {
    try{
        dispatch({type: DELETE_CHARITY_REQUEST})
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
         const response = await fetch(BACKEND_API_BASE_URL + 'charity/deleteCharity/' + id, config)
         const data = await response.json()
         console.log(data)
        dispatch({type: DELETE_CHARITY_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: DELETE_CHARITY_ERROR, error: error})
    }
}

export const addCharity = (charity) => async(dispatch, getState) => {
    try{
        dispatch({type: ADD_CHARITY_REQUEST})
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(charity)
        }
         const response = await fetch(BACKEND_API_BASE_URL + 'charity/addCharity/', config)
         const data = await response.json()

         console.log(data)
         console.log(response)
         console.log(config.data)
        dispatch({type: ADD_CHARITY_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: ADD_CHARITY_ERROR, error: error})
    }
}

export const updateCharity = (charity) => async(dispatch, getState) => {
    try{
        dispatch({type: UPDATE_CHARITY_REQUEST})
        const { userLogin: { userInfo } } = getState()
        
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(charity)
        }
         const response = await fetch(BACKEND_API_BASE_URL + 'charity/updateCharity/' + charity.id, config)
         const data = await response.json()
        dispatch({type: UPDATE_CHARITY_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: UPDATE_CHARITY_ERROR, error: error})
    }
}