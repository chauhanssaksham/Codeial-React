import { AuthStateType} from '../../types'
import { UserActionTypes, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/auth'

const initialAuthState:AuthStateType = {
    user: {},
    error: null,
    isLoggedIn: false,
    inProgress: false
}

function auth(state = initialAuthState, action: UserActionTypes):AuthStateType{
    switch(action.type){
        case LOGIN_START:
            return {
                ...state,
                inProgress: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
                error: null,
                inProgress: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                inProgress: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default auth;