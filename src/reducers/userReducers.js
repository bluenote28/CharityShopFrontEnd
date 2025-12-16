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

export const favoritesReducer = (state = {}, action) => {

        switch(action.type){
            case GET_FAVORITES_REQUEST:
                return {loading: true }
            case GET_FAVORITES_SUCCESS:
                return {loading: false, success: true, favorites: action.payload }
            case GET_FAVORITES_ERROR:
                return {loading: false, error: action.payload}
            case ADD_FAVORITE_REQUEST:
                return {loading: true }
            case ADD_FAVORITE_SUCCESS:
                return { loading: false, success: true, favorites: action.payload }
            case ADD_FAVORITE_ERROR:
                return {loading: false, error: action.payload }
            case REMOVE_FAVORITE_REQUEST:
                return {loading: true }
            case REMOVE_FAVORITE_SUCCESS:
                return { loading: false, success: true, favorites: action.payload }
            case REMOVE_FAVORITE_ERROR:
                return {loading: false, error: action.payload }
            default:
                return state
        }
}