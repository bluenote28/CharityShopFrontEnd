import { BACKEND_API_BASE_URL } from '../constants/apiContants'
import { GET_CHARITIES_REQUEST, GET_CHARITIES_ERROR, GET_CHARITIES_SUCCESS } from '../constants/reducerConstants'

export const getCharities = () => async(dispatch, getState) => {
    try{
        dispatch({type: GET_CHARITIES_REQUEST})
        const { userLogin: { userInfo } } = getState()
        
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