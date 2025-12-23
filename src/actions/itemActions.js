import { GET_ITEMS_REQUEST, GET_ITEMS_ERROR, GET_ITEMS_SUCCESS } from "../constants/reducerConstants"
import { BACKEND_API_BASE_URL } from "../constants/apiContants"

export const getItems = () => async(dispatch, getState) => {
    try{
        dispatch({type: GET_ITEMS_REQUEST})          
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          }
        const response = await fetch(BACKEND_API_BASE_URL + 'items/ebaycharityitems/', config)
        const data = await response.json()
        dispatch({type: GET_ITEMS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_ITEMS_ERROR, error: error})
    }
}