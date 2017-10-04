import { UserModel } from '../../../models/users/user.model';

export interface IUsersState {
    currentPage: number;
    firstPage: boolean;
    lastPage: boolean;
    allUsers: Array<object>;
    totalPages: number;
    status: boolean;
    currentTime: number;
    selectedUser: UserModel;
}

export const allUsersInitialState: IUsersState = {
    currentPage: 0,
    firstPage: false,
    lastPage: false,
    allUsers: [],
    totalPages: 0,
    status: false,
    currentTime: 0,
    selectedUser: null
}