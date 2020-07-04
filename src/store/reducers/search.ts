import { SearchActionTypes, FETCH_SEARCH_RESULTS_SUCCESS } from "../actions/search"
import { SearchStateType } from "../../types"

const initialAuthState: SearchStateType = {
    results: []
}

function search(state = initialAuthState, action: SearchActionTypes):SearchStateType{
    switch(action.type){
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                results: action.users
            }
        default:
            return state;
    }
}

export default search;