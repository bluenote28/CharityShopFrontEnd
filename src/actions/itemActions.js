import { GET_ITEMS_REQUEST, GET_ITEMS_ERROR, GET_ITEMS_SUCCESS } from "../constants/reducerConstants"
import { ItemsApi } from "../utilities/ApiClient"

const itemsApi = new ItemsApi()

export const getItems = () => async(dispatch) => {
    try{
        dispatch({type: GET_ITEMS_REQUEST})
        const data = await itemsApi.getAllData()
        dispatch({type: GET_ITEMS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_ITEMS_ERROR, error: error})
    }
}