import { USER_LOGIN_FAIL, 
        USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS, 
        USER_LOGOUT, 
        USER_REGISTER_SUCCESS, 
        USER_REGISTER_REQUEST, 
        USER_REGISTER_FAIL,
        USER_UPDATE_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_PROFILE_RESET,
        GET_FAVORITES_REQUEST,
        GET_FAVORITES_SUCCESS,
        GET_FAVORITES_ERROR,
        ADD_FAVORITE_ERROR,
        ADD_FAVORITE_REQUEST,
        ADD_FAVORITE_SUCCESS,
        REMOVE_FAVORITE_ERROR,
        REMOVE_FAVORITE_REQUEST,
        REMOVE_FAVORITE_SUCCESS } from "../constants/reducerConstants";


export const userLoginReducer = (state = {}, action) => {

        switch(action.type){
            case USER_LOGIN_REQUEST:
                return {loading: true }
            case USER_LOGIN_SUCCESS:
                return {loading: false, userInfo: action.payload }
            case USER_LOGIN_FAIL:
                return {loading: false, error: action.payload}
            case USER_LOGOUT:
                return {}
            default:
                return state
        }

}

export const userRegisterReducer = (state = {}, action) => {

        switch(action.type){
            case USER_REGISTER_REQUEST:
                return {loading: true }
            case USER_REGISTER_SUCCESS:
                return {loading: false, userInfo: action.payload }
            case USER_REGISTER_FAIL:
                return {loading: false, error: action.payload}
            case USER_LOGOUT:
                return {}
            default:
                return state
        }

}

export const userUpdateReducer = (state = {}, action) => {

        switch(action.type){
            case USER_UPDATE_REQUEST:
                return {loading: true }
            case USER_UPDATE_SUCCESS:
                return {loading: false, success: true, userInfo: action.payload }
            case USER_UPDATE_FAIL:
                return {loading: false, error: action.payload}
            case USER_UPDATE_PROFILE_RESET:
                return {}
            default:
                return state
        }

}

function withFavoriteItems(state, items) {
        return {
            ...state.favorites,
            items
        }
}

export const favoritesReducer = (state = {}, action) => {

        switch(action.type){
            case GET_FAVORITES_REQUEST:
                return {...state, loading: true, error: null }
            case GET_FAVORITES_SUCCESS:
                return {loading: false, success: true, favorites: action.payload }
            case GET_FAVORITES_ERROR:
                return {...state, loading: false, error: action.payload}
            case ADD_FAVORITE_REQUEST: {
                const items = state.favorites?.items || []
                const itemId = action.payload?.item
                const alreadyFavorited = items.some(item => item.ebay_id === itemId)
                return {
                    ...state,
                    error: null,
                    previousItems: items,
                    favorites: withFavoriteItems(
                        state,
                        alreadyFavorited || !itemId ? items : [...items, { ebay_id: itemId }]
                    )
                }
            }
            case ADD_FAVORITE_SUCCESS:
                return { loading: false, success: true, favorites: action.payload }
            case ADD_FAVORITE_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    favorites: withFavoriteItems(state, state.previousItems || state.favorites?.items || [])
                }
            case REMOVE_FAVORITE_REQUEST: {
                const items = state.favorites?.items || []
                const itemId = action.payload?.item
                return {
                    ...state,
                    error: null,
                    previousItems: items,
                    favorites: withFavoriteItems(
                        state,
                        itemId ? items.filter(item => item.ebay_id !== itemId) : items
                    )
                }
            }
            case REMOVE_FAVORITE_SUCCESS:
                return { loading: false, success: true, favorites: action.payload }
            case REMOVE_FAVORITE_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                    favorites: withFavoriteItems(state, state.previousItems || state.favorites?.items || [])
                }
            case USER_LOGOUT:
                return {}
            default:
                return state
        }
}