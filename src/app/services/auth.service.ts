import { Injectable } from '@angular/core';

import { NetworkService } from './network.service';


@Injectable()
export class AuthService {
    private userLogin = "login";
    private userLogout = "logout";

    constructor(private networkService: NetworkService) { }

    getUser() {
        return window.localStorage.getItem('user')
    }

    saveUser(user) {
        return window.localStorage.setItem('user', user)
    }

    isUserAuthenticated() {
        return window.localStorage.getItem('user') !== null
    }

    login(user) {
        return this.networkService
            .post(this.userLogin, user)
    }

    logout() {
        return this.networkService
            .get(this.userLogout)
    }


}