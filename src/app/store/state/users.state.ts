export interface IUsersState {
    currentPage: number,
    firstPage: boolean,
    lastPage: boolean,
    allUsers: Array<object>,
    totalPage: number,
    status: boolean
} 

export const initialState: IUsersState = {
    currentPage: 0,
    firstPage: false,
    lastPage: false,
    allUsers: [],
    totalPage: 0,
    status: false
}