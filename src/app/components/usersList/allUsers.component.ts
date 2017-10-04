import { Observable, Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/index';

export const UPDATE_TIME = 'timer/UPDATE';

@Component({
    selector: 'all-users-list',
    templateUrl: 'allUsers.component.html'
})
export class AllUsersComponent {
    private responseUsers;
    private currentTime;
    private subscribtion: Subscription;
    private response;
    private allPages;

    constructor(
        private usrsAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    updateCurrentTime() {
        let timer = Observable.timer(0, 1000);
        this.subscribtion = timer.subscribe(t => this.ngRedux.dispatch({ type: UPDATE_TIME }));      
    }

    getAllUsers() {
        this.usrsAction.getAllUsers()
        this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                this.responseUsers = data.allUsers;
                this.response = data;
                this.allPages = Array(data.totalPages).fill(0);
                
                // let users = []
                // users = this.responseUsers.map(u => {
                //     return u.currentSession === null ? 0 : 1;
                // });
                
                // if (users.indexOf(1)) {
                //     console.log(users.indexOf(1));
                //     //this.subscribtion.unsubscribe();
                // }
            })
    }

    ngOnInit() {
        this.updateCurrentTime();
        this.getAllUsers();
        
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }
}