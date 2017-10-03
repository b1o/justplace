import { initialState } from '../state/users.state'

import {
    ALL_USERS_FETCHED,
    USER_STARTED
} from '../actions/users.action'

function getAllUsers(state, action) {
    let result = action.result

    if (result.obj) {
        return Object.assign({}, state, {
            currentPage: result.obj.currentPage,
            firstPage: result.obj.firstPage,
            lastPage: result.obj.lastPage,
            allUsers: result.obj.object,
            totalPage: result.obj.totalPage,
            status: result.status
        })
    }

    return state
}

function startUser(state, action) {
    let result = action.result;
    let userId = action.userInfo.user.id;

    console.log('from reducer', action)
    
    if (result.obj) {
        let users = state.allUsers
        for (let user of users) {
            if(user.id === userId) {
                user.currentSession = result
            }
        }
    }

    return state
}

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case ALL_USERS_FETCHED:
            return getAllUsers(state, action);
        case USER_STARTED:
            return startUser(state, action);
        default:
            return state;
    }
}