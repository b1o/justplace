import { ILayoutState } from './state/layout.state';
import { ILoginState } from './state/login.state';
import { IUsersState } from './state/users.state';

export interface IAppState {
    loginUser: ILoginState,
    allUsers: IUsersState,
    layout: ILayoutState
}