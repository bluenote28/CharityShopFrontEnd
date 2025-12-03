import { GET_CHARITIES_REQUEST, GET_CHARITIES_ERROR, GET_CHARITIES_SUCCESS } from '../constants/reducerConstants'

export const charityReducer = (state = {charities:[]}, action) => {

        switch(action.type){
            case GET_CHARITIES_REQUEST:
                return {loading: true, charities: []}
            case GET_CHARITIES_SUCCESS:
                return {loading: false, charities: action.payload}
            case GET_CHARITIES_ERROR:
                return {loading: false, error: action.error, charities: []}
            default:
                return state
        }

}