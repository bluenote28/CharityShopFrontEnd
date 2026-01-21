import { GET_CHARITIES_REQUEST, GET_CHARITIES_ERROR, GET_CHARITIES_SUCCESS, 
       DELETE_CHARITY_REQUEST, DELETE_CHARITY_ERROR, DELETE_CHARITY_SUCCESS, 
       ADD_CHARITY_ERROR, ADD_CHARITY_REQUEST, ADD_CHARITY_SUCCESS, UPDATE_CHARITY_ERROR,
       UPDATE_CHARITY_REQUEST, UPDATE_CHARITY_SUCCESS } from '../constants/reducerConstants'

export const charityReducer = (state = {charities:[]}, action) => {

        switch(action.type){
            case GET_CHARITIES_REQUEST:
                return {loading: true, charities: []}
            case GET_CHARITIES_SUCCESS:
                return {loading: false, charities: action.payload}
            case GET_CHARITIES_ERROR:
                return {loading: false, error: action.error, charities: []}
            case DELETE_CHARITY_REQUEST:
                return {loading: true, charities: []}
            case DELETE_CHARITY_ERROR:
                return {loading: false, error: action.error, charities: []}
            case DELETE_CHARITY_SUCCESS:
                return {loading: false, charities: action.payload}
            case ADD_CHARITY_REQUEST:
                return {loading: true, charities: []}
            case ADD_CHARITY_ERROR:
                return {loading: false, error: action.error, charities: []}
            case ADD_CHARITY_SUCCESS:
                return {loading: false, charities: action.payload}
            case UPDATE_CHARITY_REQUEST:
                return {loading: true, charities: []}
            case UPDATE_CHARITY_ERROR:
                return {loading: false, error: action.error, charities: []}
            case UPDATE_CHARITY_SUCCESS:
                return {loading: false, charities: action.payload}
            default:
                return state
        }

}