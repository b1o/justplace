import { Subscription } from 'rxjs/Rx';
import { IAppState } from '../../../store/index';
import { NgRedux } from '@angular-redux/store';
import { UsersAction } from '../../../store/actions/users.action';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'active-users',
    templateUrl: 'activeUsers.component.html'
})

export class ActiveUsersComponent implements OnInit {
    private responseUsers;
    private currentTime;
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

    ngOnDestroy() {
        //this.timerSubscription.unsubscribe();
        this.allUserSubscription.unsubscribe();
    }
}