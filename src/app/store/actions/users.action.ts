import { UsersService } from '../../services/users.service';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../app.state';

export const ALL_USERS_FETCHED = 'users/GET_ALL';
export const USER_STARTED = 'timer/START';

@Injectable() 
export class UsersAction {
    constructor (
        private usersService: UsersService,
        private ngRedux: NgRedux<IAppState>
    ) {}

    getAllUsers () {
        this.usersService
            .getAllUsers ()
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: ALL_USERS_FETCHED,
                    result
                })
            })
    }

    start (userInfo) {
        this.usersService
            .start(userInfo)
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: USER_STARTED,
                    result,
                    userInfo
                })
            })
    } 
}