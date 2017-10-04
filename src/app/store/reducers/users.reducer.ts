import { DESELECT_USER } from './../actions/users.action';
import { UserModel } from '../../../models/users/user.model';
import { UPDATE_TIME } from '../../components/usersList/allUsers.component';
import { ALL_USERS_FETCHED, GET_USER_INFO, REGISTER_USER, USER_STARTED, USER_STOP } from '../actions/users.action';
import { allUsersInitialState, IUsersState } from '../state/users.state';

function getAllUsers(state, action) {
    let result = action.result

    if (result.obj) {
        return Object.assign({}, state, {
            currentPage: result.obj.currentPage,
            firstPage: result.obj.firstPage,
            lastPage: result.obj.lastPage,
            allUsers: result.obj.object,
            totalPages: result.obj.totalPages,
            status: result.status,
            currentTime: result.obj.currentTime
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
            return u.id === userId ? { ...u, currentSession: result.obj } : u;
        });

        const newState = { ...state, allUsers: users, currentTime: result.obj.currentTime };
        return newState;
    }

    return state;
}

function stopUser(state, action) {
    const result = action.result;
    const id = action.id;
    let users = [];

    if (result.obj) {
        users = state.allUsers.map(u => {
            return u.id === id ? { ...u, currentSession: null } : u;
        });

        const newState = { ...state, allUsers: users };
        return newState;
    }

    return state;
}

function updateCurrentTime(state, action) {
    let time = state.currentTime;
    time += 1000;

    return Object.assign({}, state, {
        currentTime: time
    })
}

function registerUser(state, payload) {
    if (payload) {
        return { ...state, allUsers: [...state.allUsers, payload] }
    }

    return state;
}

function getUserInfo(state: IUsersState, payload) {
    if (payload) {
        return { ...state, selectedUser: payload.obj as UserModel };
    }

    return state;
}

export function usersReducer(state = allUsersInitialState, action) {
    switch (action.type) {
        case ALL_USERS_FETCHED:
            return getAllUsers(state, action);
        case USER_STARTED:
            return startUser(state, action);
        case USER_STOP:
            return stopUser(state, action);
        case UPDATE_TIME:
            return updateCurrentTime(state, action);
        case REGISTER_USER:
            return registerUser(state, action.payload);
        case GET_USER_INFO:
            return getUserInfo(state, action.payload);
        case DESELECT_USER:
            return { ...state, selectedUser: null }
        default:
            return state;
    }
}