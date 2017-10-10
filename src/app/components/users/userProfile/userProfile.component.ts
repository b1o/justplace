import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';
import { StartModalComponent } from '../../modal/startModal.component';
import { StopModalComponent } from '../../modal/stopModal.component';

@Component({
    selector: 'user-profile',
    templateUrl: 'userProfile.component.html'
})

export class UserProfileComponent implements OnInit, OnDestroy {

    @ViewChild(StartModalComponent) startModal: StartModalComponent;
    @ViewChild(StopModalComponent) stopModal: StopModalComponent;

    public id: number;
    public user;
    public time = 0;
    public currentSession;
    private storeSub;
    private sub;

    private userWithCurrSession;
    private timerSubscription: Subscription


    constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private usersActions: UsersAction, private ngRedux: NgRedux<IAppState>) {

    }


    ngOnInit() {

        this.route.params
            .subscribe(params => {
                this.id = params['id'];
                this.usersActions.getUserInfo(this.id)

                this.storeSub = this.ngRedux
                    .select(state => state.allUsers.selectedUser)
                    .filter(s => s != null)
                    .subscribe(state => {
                        this.user = { ...state };
                        this.currentSession = this.user.sessions.filter(s => s.endTime === null)[0]

                        this.userWithCurrSession = { ...this.user, currentSession: this.currentSession };
                    })
            })
    }

    ngOnDestroy(): void {
        this.usersActions.deselectUser()
        if (this.storeSub) {
            this.user = null
            this.storeSub.unsubscribe()
        }
    }
}