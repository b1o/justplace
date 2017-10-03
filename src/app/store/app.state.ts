import { IUsersState } from './state/users.state';
import { ILoginState } from './state/login.state'

export interface IAppState {
    loginUser: ILoginState,
    allUsers: IUsersState
}