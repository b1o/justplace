import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { IAppState } from '../app.state';

export const USER_REGISTERED = 'users/REGISTER'
export const USER_LOGGED_IN = 'users/LOGIN'
export const USER_LOGOUT = 'users/LOGOUT'

@Injectable()
export class LoginActions {
    constructor(
        private authService: AuthService,
        private ngRedux: NgRedux<IAppState>
    ) { }

    login(user) {
        this.authService
            .login(user)
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: USER_LOGGED_IN,
                    result
                })
            })
    }

    logout() {
        this.authService
            .logout()
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: USER_LOGOUT,
                    result
                });
            });
    }
}