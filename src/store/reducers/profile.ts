import { ProfileStateType} from '../../types'
import { USER_PROFILE_SUCCESS, ProfileActionTypes, USER_PROFILE_FAILURE, START_FETCH_USER_PROFILE } from '../actions/profile';

const initialAuthState:ProfileStateType = {
    user: null,
    success: false,
    inProgress: false,
    error: null
}

function profile(state = initialAuthState, action: ProfileActionTypes):ProfileStateType{
    switch(action.type){
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                success: true,
                user: action.user,
                inProgress: false
            }
        case USER_PROFILE_FAILURE:
            return {
                ...state,
                error: action.error,
                inProgress: false
            }
        case START_FETCH_USER_PROFILE:
            return {
                ...state,
                inProgress: true
            }
        default:
            return state;
    }
}

export default profile;