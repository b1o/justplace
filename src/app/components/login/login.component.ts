import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAppState } from 'app/store';
import { Subscription } from 'rxjs/Rx';

import { AuthService } from '../../services/auth.service';
import { LoginActions } from '../../store/actions/login.actions';
import { LoginModel } from './login.model';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    public user: LoginModel = new LoginModel()
    private subscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private loginActions: LoginActions
    ) { }

    login() {
        this.loginActions.login(this.user)
        this.subscription = this.ngRedux
            .select(state => state.loginUser)
            .subscribe(user => {
                if (user.obj && user.status) {
                    this.authService.saveUser(user.obj)
                    this.router.navigateByUrl('users')
                }
            })
    }

    ngOnInit() {
        // if (this.authService.isUserAuthenticated()) {
        //     this.router.navigateByUrl('users')
        // }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}