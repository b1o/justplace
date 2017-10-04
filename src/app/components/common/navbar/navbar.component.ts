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

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private loginActions: LoginActions,
        private router: Router,
        private layoutActions: LayoutActions) { }

    logout() {
        this.loginActions.logout();
    }

    toggleSidenav() {
        this.sidenavOpened ? this.layoutActions.closeSidenav() : this.layoutActions.openSidenav();
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