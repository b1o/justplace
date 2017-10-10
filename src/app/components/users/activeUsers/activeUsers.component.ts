import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';

@Component({
    selector: 'active-users',
    templateUrl: 'activeUsers.component.html'
})

export class ActiveUsersComponent implements OnInit {
    public responseUsers;
    public currentTime;
    private allUserSubscription: Subscription;

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    ngOnInit() {
        this.usersAction.getActiveUsers();
        this.allUserSubscription = this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                this.responseUsers = data.allUsers;
            })
    }

    trackByFn(index, element) {
        return element.id;
    }

    ngOnDestroy() {
        //this.timerSubscription.unsubscribe();
        this.allUserSubscription.unsubscribe();
    }
}