import { StopModalComponent } from '../../modal/stopModal.component';
import { StartModalComponent } from '../../modal/startModal.component';
import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';

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
    
    private userWithCurrSession;


    constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private usersActions: UsersAction, private ngRedux: NgRedux<IAppState>) {

    }

    ngOnInit() {
        this.storeSub = this.ngRedux
            .select(state => state.allUsers.selectedUser)
            .filter(s => s != null)
            .subscribe(state => {
                this.user = { ...state };
                this.currentSession = this.user.sessions.filter(s => s.endTime === null)[0]
                console.log(this.currentSession)
                
                this.userWithCurrSession = { ...this.user, currentSession: this.currentSession};
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