export interface ILoginState {
    obj: boolean;
    status: boolean;
    userAuthenticated: boolean;

}

export const loginInitialState: ILoginState = {
    obj: false,
    status: false,
    userAuthenticated: false
}