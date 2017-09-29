
import { NetworkService } from './network.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IUser } from 'app/interfaces/IUser';


@Injectable()
export class AuthService {
    private userLogin = "login";
    private userLogout = "logout";
    public isLogged: Subject<boolean> = new Subject<boolean>();
    public user: Subject<IUser> = new Subject<IUser>();

    constructor(private networkService: NetworkService) { }

    getUser () {
        return window.localStorage.getItem('user')
    }

    saveUser (user) {
        return window.localStorage.setItem('user', user)
    }

    login (user) {
        this.networkService
            .post(this.userLogin, user)
            .subscribe(data => {
                this.user.next(data)
                this.isLogged.next(true)
        })
    }

    logout () {
        this.networkService
            .get(this.userLogout)
            .subscribe(() => {
                this.user.next(null)
            })
    }

    
}