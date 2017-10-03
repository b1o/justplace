import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core'
import { NgRedux } from 'ng2-redux'
import { IAppState } from '../app.state'

export const USER_REGISTERED = 'users/REGISTER'
export const USER_LOGGED_IN = 'users/LOGIN'
export const USER_LOGOUT = 'users/LOGOUT'

@Injectable() 
export class LoginActions {
    constructor (
        private authService: AuthService,
        private ngRedux: NgRedux<IAppState>
    ) {}

    login (user) {
        this.authService
            .login (user)
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: USER_LOGGED_IN,
                    result
                })
            })
    }
}