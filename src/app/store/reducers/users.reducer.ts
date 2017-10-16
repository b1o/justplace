import { UserModel } from '../../../models/users/user.model';
import { UPDATE_TIME } from '../../components/usersList/allUsers.component';
import {
    ALL_USERS_FETCHED,
    CHANGE_PAGE,
    GET_ACTIVE_USERS,
    GET_USER_INFO,
    REGISTER_USER,
    UPDATE_PRICE,
    USER_SEARCH,
    USER_STARTED,
    USER_STOP,
    SESSION_PAID
} from '../actions/users.action';
import { allUsersInitialState, IUsersState } from '../state/users.state';
import { DESELECT_USER } from './../actions/users.action';

function getAllUsers(state, action) {
    let result = action.result

    if (result.obj) {
        for (let u of result.obj.object) {
            if (u.currentSession) {
                u['price'] = u.currentSession.pricePerHour;
            }
        }

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

        const newState = { ...state, allUsers: users, currentTime: result.obj.now };
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

function searchUser(state, payload) {
    if (payload.obj) {
        return { ...state, allUsers: payload.obj.object }
    }

    return state;
}

function getActiveUsers(state, payload) {

    if (payload.obj) {
        return { ...state, allUsers: payload.obj.object }
    }

    return state;
}

function updateUserPrice(state: IUsersState, payload) {
    if (payload) {
        const users = state.allUsers.map((u: any) => {
            if (u.id !== payload.id) {
                return u;
            }

            return {
                ...u,
                price: payload.newPrice
            }
        });

        return { ...state, allUsers: users }
    }
    return state;
}

function sessionPaid(state, payload) {
    let result = payload.obj;
    if (result) {
        const sessions = state.selectedUser.sessions.map((s) => {
            if (s.id === result.id) {
                return { ...s, paid: result.paid }                
            }

            return { ...s }
        });

        let selectedUser = state.selectedUser;
        selectedUser = { ...selectedUser, sessions: sessions };

        return { ...state, selectedUser: selectedUser }
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
        case CHANGE_PAGE:
            return getAllUsers(state, action);
        case USER_SEARCH:
            return searchUser(state, action.payload);
        case GET_ACTIVE_USERS:
            return getActiveUsers(state, action.payload);
        case UPDATE_PRICE:
            return updateUserPrice(state, action.payload);
        case SESSION_PAID: 
            return sessionPaid(state, action.payload);
        default:
            return state;
    }
}