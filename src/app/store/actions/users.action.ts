import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { UserModel } from '../../../models/users/user.model';
import { UsersService } from '../../services/users.service';
import { IAction, IAppState } from '../app.state';

import { GET_PRICE_PER_HOUR } from './settings.actions';

export const ALL_USERS_FETCHED = 'users/GET_ALL';
export const USER_STARTED = 'timer/START';
export const USER_STOP = 'timer/STOP';
export const REGISTER_USER = 'users/register';
export const GET_USER_INFO = 'users/GET_INFO';
export const DESELECT_USER = 'users/deselect_current';
export const USER_SEARCH = 'users/search';
export const UPDATE_PRICE = 'users/update_price';
export const GET_ACTIVE_USERS = 'users/active';

export const CHANGE_PAGE = '[LAYOUT] previous page';

@Injectable()
export class UsersAction {
    constructor(
        private usersService: UsersService,
        private ngRedux: NgRedux<IAppState>,
        private router: Router
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

    updateUserPrice(newPrice, id) {
        const user: any = this.ngRedux.getState().allUsers.allUsers.find((u: any) => u.id === id);
        if (user.currentSession) {
            const pricePerHour = user.currentSession.pricePerHour;
            const users = user.currentSession.userCount;
            const minutes = moment.duration(this.ngRedux.getState().allUsers.currentTime - user.currentSession.startTime).asMinutes()
            console.log(minutes)
            const price = ((minutes / 60) * pricePerHour * users).toFixed(2);
            this.ngRedux.dispatch<IAction>({ type: UPDATE_PRICE, payload: { newPrice: price, id } })
        }

    }

    deselectUser() {
        this.ngRedux.dispatch<IAction>({ type: DESELECT_USER })
    }

    getAllUsers(url) {
        this.usersService
            .getAllUsers(url)
            .subscribe(result => {
                this.ngRedux.dispatch({
                    type: ALL_USERS_FETCHED,
                    result
                });
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
                // ????????
                this.getUserInfo(userInfo.user.id);
            });
    };

    registerUser(user: UserModel) {
        this.usersService
            .registerUser(user)
            .subscribe(res => {
                this.ngRedux
                    .dispatch<IAction>({ type: REGISTER_USER, payload: res });
                this.router.navigate(['/users', res.obj.id])
            });
    }

    searchUser(term) {
        this.usersService
            .searchUser(term)
            .subscribe(res => {
                this.ngRedux
                    .dispatch<IAction>({ type: USER_SEARCH, payload: res });
            });
    }

    getActiveUsers() {
        this.usersService
            .getActiveUsers()
            .subscribe(res => {
                this.ngRedux
                    .dispatch({ type: GET_ACTIVE_USERS, payload: res });
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
                });
                // ????????
                this.getUserInfo(id);
            })
    }

    changePage(pageUrl) {
        this.usersService
            .changePage(pageUrl)
            .subscribe(result => {
                this.ngRedux
                    .dispatch({
                        type: CHANGE_PAGE,
                        result
                    });
            })
    }
}