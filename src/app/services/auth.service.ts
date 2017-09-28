import { NetworkService } from './network.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
    private userLogin = "login"
    private userLogout = "logout"

    constructor(private networkService: NetworkService) { }

    getUser () {
        return window.localStorage.getItem('user')
    }

    saveUser (user) {
        return window.localStorage.setItem('user', user)
    }

    login (user) {
        return this.networkService.post(this.userLogin, user, true)
    }

    logout () {
        return this.networkService.get(this.userLogout)
    }

    
}