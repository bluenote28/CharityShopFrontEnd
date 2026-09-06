import { GET_CHARITIES_REQUEST, GET_CHARITIES_ERROR, GET_CHARITIES_SUCCESS, 
       DELETE_CHARITY_REQUEST, DELETE_CHARITY_ERROR, DELETE_CHARITY_SUCCESS, 
       ADD_CHARITY_ERROR, ADD_CHARITY_REQUEST, ADD_CHARITY_SUCCESS, UPDATE_CHARITY_ERROR,
       UPDATE_CHARITY_REQUEST, UPDATE_CHARITY_SUCCESS } from '../constants/reducerConstants'

export const charityReducer = (state = {charities:[]}, action) => {

        switch(action.type){
            case GET_CHARITIES_REQUEST:
                return {
                    ...state,
                    loading: !(state.charities && state.charities.length),
                    error: null
                }
            case GET_CHARITIES_SUCCESS:
                return {
                    loading: false,
                    charities: Array.isArray(action.payload) ? action.payload : (state.charities || [])
                }
            case GET_CHARITIES_ERROR:
                return {loading: false, error: action.error, charities: []}
            case DELETE_CHARITY_REQUEST:
                return {
                    ...state,
                    error: null,
                    previousCharities: state.charities,
                    charities: (state.charities || []).filter(
                        (charity) => String(charity.id) !== String(action.payload)
                    )
                }
            case DELETE_CHARITY_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.error,
                    charities: state.previousCharities || state.charities || []
                }
            case DELETE_CHARITY_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    charities: (state.charities || []).filter(
                        (charity) => String(charity.id) !== String(action.payload)
                    )
                }
            case ADD_CHARITY_REQUEST:
                return { ...state }
            case ADD_CHARITY_ERROR:
                return { ...state, loading: false }
            case ADD_CHARITY_SUCCESS:
                return { ...state, loading: false }
            case UPDATE_CHARITY_REQUEST:
                return { ...state }
            case UPDATE_CHARITY_ERROR:
                return { ...state, loading: false }
            case UPDATE_CHARITY_SUCCESS:
                return { ...state, loading: false }
            default:
                return state
        }

}