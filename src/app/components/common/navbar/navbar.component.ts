import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';

import { LoginActions } from '../../../store/actions/login.actions';
import { IAppState } from '../../../store/index';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    public isLoggedIn = false;

    constructor(private ngRedux: NgRedux<IAppState>, private loginActions: LoginActions, private router: Router) { }

    logout() {
        this.loginActions.logout()
    }

    ngOnInit() {
        this.ngRedux.select(state => state.loginUser)
            .subscribe(u => {
                console.log('login component', u)
                if (u.userAuthenticated) {
                    this.isLoggedIn = true;
                } else {
                    this.router.navigate(['/login']);
                    this.isLoggedIn = false;
                }
            })
    }
}