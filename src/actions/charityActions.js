import { GET_CHARITIES_REQUEST, GET_CHARITIES_ERROR, GET_CHARITIES_SUCCESS } from '../constants/reducerConstants'
import { CharityApi } from "../utilities/ApiClient"

const charityApi = new CharityApi()

export const getCharities = () => async(dispatch) => {
    try{
        dispatch({type: GET_CHARITIES_REQUEST})
        const data = await charityApi.getAllData()
        dispatch({type: GET_CHARITIES_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: GET_CHARITIES_ERROR, error: error})
    }
}