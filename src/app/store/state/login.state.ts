export interface ILoginState {
    obj: boolean;
    status: boolean;
    userAuthenticated: boolean;

}

export const initialState: ILoginState = {
    obj: false,
    status: false,
    userAuthenticated: false
}