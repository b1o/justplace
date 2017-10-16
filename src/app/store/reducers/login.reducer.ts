import { USER_LOGGED_IN, USER_LOGOUT, USER_REGISTERED } from '../actions/login.actions';
import { loginInitialState } from '../state/login.state';

function userRegistration(state, action) {
    const result = action.result;

    return Object.assign({}, state, {
        userRegistered: result.success
    })
}

function userLogin(state, action) {
    const result = action.result;

    return Object.assign({}, state, {
        obj: result.obj,
        status: result.status,
        userAuthenticated: result.status
    })

}

function userLogout(state, action) {
    return Object.assign({}, state, {
        userAuthenticated: false,
        obj: false,
    })
}

export function loginReducer(state = loginInitialState, action) {
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