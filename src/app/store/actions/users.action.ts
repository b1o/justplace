import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { UserModel } from '../../../models/users/user.model';
import { UsersService } from '../../services/users.service';
import { IAction, IAppState } from '../app.state';

export const ALL_USERS_FETCHED = 'users/GET_ALL';
export const USER_STARTED = 'timer/START';
export const USER_STOP = 'timer/STOP';
export const REGISTER_USER = 'users/register';
export const GET_USER_INFO = 'users/GET_INFO';

@Injectable()
export class UsersAction {
    constructor(
        private usersService: UsersService,
        private ngRedux: NgRedux<IAppState>
    ) { }

    getUserInfo(id: number) {
        this.usersService.getUserInfo(id)
            .subscribe(res => {
                this.ngRedux.dispatch<IAction>({
                    type: GET_USER_INFO,
                    payload: res
                });
            });
    }

    getAllUsers() {
        this.usersService
            .getAllUsers()
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: ALL_USERS_FETCHED,
                    result
                })
            })
    }

    start(userInfo) {
        this.usersService
            .start(userInfo)
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: USER_STARTED,
                    result,
                    userInfo
                });
            });
    };

    registerUser(user: UserModel) {
        this.usersService
            .registerUser(user)
            .subscribe(res => {
                this.ngRedux
                    .dispatch<IAction>({ type: REGISTER_USER, payload: res });
            })
    }

    stop(id) {
        this.usersService
            .stop(id)
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: USER_STOP,
                    result,
                    id
                })
            })
    }
}