import { AuthStateType} from '../../types'
import { AuthActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_ERRORS } from '../actions/auth'

const initialAuthState:AuthStateType = {
    user: null,
    error: null,
    isLoggedIn: false,
    inProgress: false
}

function auth(state = initialAuthState, action: AuthActionTypes):AuthStateType{
    switch(action.type){
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                inProgress: true,
                user: null
            }
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                user: action.user,
                isLoggedIn: true,
                error: null,
                inProgress: false
            }
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.message,
                user: null
            }
        case AUTHENTICATE_USER:
            return{
                ...state,
                isLoggedIn: true,
                user: action.user
            }
        case LOG_OUT:
            return {
                ...state,
                user: null,
                isLoggedIn: false
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