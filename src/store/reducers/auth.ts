import { AuthStateType} from '../../types'
import { AuthActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../actions/auth'

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
        default:
            return state;
    }
}

export default auth;