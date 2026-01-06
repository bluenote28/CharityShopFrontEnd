import { GET_ITEMS_REQUEST, GET_ITEMS_ERROR, GET_ITEMS_SUCCESS } from '../constants/reducerConstants'

export const itemsReducer = (state = {items:[]}, action) => {

        switch(action.type){
            case GET_ITEMS_REQUEST:
                return {loading: true, items: []}
            case GET_ITEMS_SUCCESS:
                return {loading: false, items: action.payload}
            case GET_ITEMS_ERROR:
                return {loading: false, error: action.error, items: []}
            default:
                return state
        }
}