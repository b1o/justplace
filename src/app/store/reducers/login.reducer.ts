import { initialState } from '../state/login.state'

import  { 
    USER_REGISTERED, 
    USER_LOGGED_IN,
    USER_LOGOUT
} from '../actions/login.actions'

function userRegistration (state, action) {
    const result = action.result;

    return Object.assign({}, state, {
        userRegistered: result.success
    })
}

function userLogin (state, action) {
    const result = action.result;
    
    return Object.assign({}, state, {
        obj: result.obj,
        status: result.status
    })

}

function userLogout (state, action) {
    return Object.assign({}, state, {
        userAuthenticated: false,
        token: null,
        username: null
    })
}

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case USER_REGISTERED:
            return userRegistration(state, action);
        case USER_LOGGED_IN:
            return userLogin(state, action);
        case USER_LOGOUT:
            return userLogout(state, action);
        default:
            return state;
        }
}