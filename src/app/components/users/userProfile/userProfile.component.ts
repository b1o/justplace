import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';

@Component({
    selector: 'user-profile',
    templateUrl: 'userProfile.component.html'
})

export class UserProfileComponent implements OnInit, OnDestroy {

    public id: number;
    public user;
    private storeSub;

    constructor(private route: ActivatedRoute, private usersActions: UsersAction, private ngRedux: NgRedux<IAppState>) {
        this.storeSub = this.ngRedux.select(state => state.allUsers.selectedUser)
            .filter(s => s != null)
            .subscribe(state => {
                console.log(state)
                this.user = { ...state };
                this.user.currentSession = this.user.sessions.filter(s => s.endTime === null)

            })
        this.route.params
            .subscribe(params => {
                this.id = params['id'];
                this.usersActions.getUserInfo(this.id)


            })


    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        if (this.storeSub) {
            this.storeSub.unsubscribe()
        }
    }
}