import { GET_ITEMS_REQUEST, GET_ITEMS_ERROR, GET_ITEMS_SUCCESS } from "../constants/reducerConstants"
import { BACKEND_API_BASE_URL } from "../constants/apiContants"


async function apiCall(url){

    const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (response.status !== 200){
        throw new Error(data.message || 'API call failed')
    }

    return data

}

export const getItems = (item_id=null, search_text=null, category_id=null) => async(dispatch) => {
    try{
        dispatch({type: GET_ITEMS_REQUEST})     
        
        var data = []

        if (item_id){
            var url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/' + item_id
            data = await apiCall(url)
        }
        else if (search_text){
            var url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/search/' + search_text
            data = await apiCall(url)
        }
        else if (category_id){
            var url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/category/' + category_id
            data = await apiCall(url)
        }
        dispatch({type: GET_ITEMS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_ITEMS_ERROR, error: error})
    }
}