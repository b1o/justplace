import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/index';

@Component({
    selector: 'all-users-list',
    templateUrl: 'allUsers.component.html'
})
export class AllUsersComponent {
    private responseUsers;
    private currentTime;

    constructor(
        private usrsAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.usrsAction.getAllUsers()
        this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                this.responseUsers = data.allUsers
            })

    }
}