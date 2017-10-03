import { ALL_USERS_FETCHED, USER_STARTED } from '../actions/users.action';
import { initialState } from '../state/users.state';

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

    return state;
}

function startUser(state, action) {
    const result = action.result;
    const userId = action.userInfo.user.id;
    let users = [];


    if (result.obj) {
        users = state.allUsers.map(u => {
            return u.id === userId ? { ...u, currentSession: result } : u;
        });

        const newState = { ...state, allUsers: users };
        return newState;
    }


    return state;
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