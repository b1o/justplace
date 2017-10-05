import { NgRedux } from '@angular-redux/store';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
    selector: 'user-profile',
    templateUrl: 'userProfile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('time', [
            transition("* => *", [style({ transform: "translatey(-100%)" }), animate("200ms")])
        ])
    ]
})

export class UserProfileComponent implements OnInit, OnDestroy {

    public id: number;
    public user;
    public time = 0;
    private storeSub;

    constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private usersActions: UsersAction, private ngRedux: NgRedux<IAppState>) {

    }

    ngOnInit() {
        // setInterval(() => {
        //     this.time++;
        //     this.cd.detectChanges()
        // }, 1000)

        this.storeSub = this.ngRedux
            .select(state => state.allUsers.selectedUser)
            .filter(s => s != null)
            .subscribe(state => {
                console.log(state)
                this.user = { ...state };
                this.user.currentSession = this.user.sessions.filter(s => s.endTime === null)
                this.cd.detectChanges()
            })
        this.route.params
            .subscribe(params => {
                this.id = params['id'];
                this.usersActions.getUserInfo(this.id)


            })
    }

    ngOnDestroy(): void {
        console.log('destroying profile')
        this.usersActions.deselectUser()
        if (this.storeSub) {
            this.user = null
            this.storeSub.unsubscribe()
        }
    }
}