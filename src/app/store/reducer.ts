import { combineReducers } from 'redux';

import { IAppState } from './app.state';
import { layoutReducer } from './reducers/layout.reducer';
import { loginReducer } from './reducers/login.reducer';
import { usersReducer } from './reducers/users.reducer';

export const reducer = combineReducers<IAppState>({
    loginUser: loginReducer,
    allUsers: usersReducer,
    layout: layoutReducer
})