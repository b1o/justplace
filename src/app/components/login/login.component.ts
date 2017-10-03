import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAppState } from 'app/store';
import { NgRedux } from 'ng2-redux';

import { AuthService } from '../../services/auth.service';
import { LoginActions } from '../../store/actions/login.actions';
import { LoginModel } from './login.model';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    private user: LoginModel = new LoginModel()

    constructor(
        private authService: AuthService,
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private loginActions: LoginActions
    ) { }

    ngOnInit() {
        if (this.authService.isUserAuthenticated()) {
            this.router.navigateByUrl('users')
        }
    }


    login() {
        this.loginActions.login(this.user)
        this.ngRedux
            .select(state => state.loginUser)
            .subscribe(user => {
                if (user.obj && user.status) {
                    this.authService.saveUser(user.obj)
                    this.router.navigateByUrl('users')
                }
            })
    }
}