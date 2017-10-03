import { LoginActions } from '../../store/actions/login.actions';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from 'app/store';

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