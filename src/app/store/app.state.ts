import { ILayoutState, layoutInitialState } from './state/layout.state';
import { ILoginState, loginInitialState } from './state/login.state';
import { allUsersInitialState, IUsersState } from './state/users.state';

export interface IAppState {
    loginUser: ILoginState,
    allUsers: IUsersState,
    layout: ILayoutState
}

export const appInitialState: IAppState = {
    loginUser: loginInitialState,
    allUsers: allUsersInitialState,
    layout: layoutInitialState
}

export interface IAction {
    type: string;
    payload?: any;
}