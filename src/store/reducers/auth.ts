import { AuthStateType} from '../../types'
import { AuthActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_ERRORS } from '../actions/auth'

const initialAuthState:AuthStateType = {
    user: null,
    error: null,
    isLoggedIn: false,
    inProgress: false,
    user_loading: (localStorage.getItem('token') === null ? false:true)
}

function auth(state = initialAuthState, action: AuthActionTypes):AuthStateType{
    switch(action.type){
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                inProgress: true,
                user: null,
                user_loading:true
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
                error: null,
                inProgress: false,
                user_loading:false
            }
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.message,
                user: null,
                user_loading:false
            }
        case AUTHENTICATE_USER:
            return{
                ...state,
                isLoggedIn: true,
                user: action.user,
                user_loading: false
            }
        case LOG_OUT:
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                user_loading: false
            }
        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export default auth;