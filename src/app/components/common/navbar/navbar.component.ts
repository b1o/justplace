import { UsersAction } from '../../../store/actions/users.action';
import { Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutActions } from '../../../store/actions/layout.actions';
import { LoginActions } from '../../../store/actions/login.actions';
import { IAppState } from '../../../store/index';

@Component({
    selector: 'navbar',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    public isLoggedIn = false;
    private sidenavOpened = false;
    private subscription: Subscription;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private loginActions: LoginActions,
        private router: Router,
        private layoutActions: LayoutActions,
        private usersAction: UsersAction
    ) { }

    logout() {
        this.loginActions.logout();
    }

    toggleSidenav() {
        this.sidenavOpened ? this.layoutActions.closeSidenav() : this.layoutActions.openSidenav();
    }

    getActiveUsers() {
        this.usersAction.getActiveUsers();
    }

    ngOnInit() {
        this.subscription = this.ngRedux.select(state => state.loginUser)
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

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}