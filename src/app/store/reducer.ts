import { usersReducer } from './reducers/users.reducer';
import { combineReducers } from 'redux'
import { IAppState } from './app.state'

import { loginReducer } from './reducers/login.reducer'

export const reducer = combineReducers<IAppState>({
    loginUser: loginReducer,
    allUsers: usersReducer
})