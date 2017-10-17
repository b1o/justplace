import { SettingsActions } from '../../store/actions/settings.actions';
import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/index';

export const UPDATE_TIME = 'timer/UPDATE';

@Component({
    selector: 'all-users-list',
    templateUrl: 'allUsers.component.html',
})
export class AllUsersComponent {
    public responseUsers;
    public currentTime;
    private timerSubscription: Subscription;
    private allUserSubscription: Subscription;
    public response;

    constructor(
        private usrsAction: UsersAction,
        private settingsActions: SettingsActions,
        private ngRedux: NgRedux<IAppState>,
        private cd: ChangeDetectorRef
    ) { }

    updateCurrentTime() {
        let timer = Observable.timer(0, 1000);
        //this.timerSubscription = timer.subscribe(t => this.ngRedux.dispatch({ type: UPDATE_TIME }));      
    }

    getAllUsers() {
        let url = 'users';
        this.usrsAction.getAllUsers(url);
        this.allUserSubscription = this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                this.responseUsers = data.allUsers;
                this.response = {
                    "lastPage": data.lastPage,
                    "firstPage": data.firstPage,
                    "totalPages": data.totalPages,
                    "currentPage": data.currentPage
                };

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

    trackByFn(index, element) {
        return element.id;
    }

    ngOnInit() {
        this.updateCurrentTime();
        this.getAllUsers();
        this.settingsActions.getPrice();
    }

    ngOnDestroy() {
        //this.timerSubscription.unsubscribe();
        this.allUserSubscription.unsubscribe();
    }
}