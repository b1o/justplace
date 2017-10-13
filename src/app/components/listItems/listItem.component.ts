import { NgRedux } from '@angular-redux/store';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/app.state';
import { StartModalComponent } from '../modal/startModal.component';
import { StopModalComponent } from '../modal/stopModal.component';

@Component({
    selector: 'list-item',
    templateUrl: 'listItem.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ListItemComponent implements OnInit {
    @Input() user;
    @ViewChild(StartModalComponent) startModal: StartModalComponent;
    @ViewChild(StopModalComponent) stopModal: StopModalComponent;

    public startTime;
    public currentSession;

    private subscription: Subscription;
    private time;
    private price = '0';
    private minutes = 0;

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>,
        private cd: ChangeDetectorRef
    ) { }

    getGameTime(startTime, currentTime) {
        let miliseconds = currentTime - startTime;
        let hours = Math.floor(miliseconds / (60000 * 60));
        let minutes = Math.floor((miliseconds / 60000) % 60);
        let seconds = Number(((miliseconds % 60000) / 1000).toFixed(0));
        return hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    ngOnInit() {
        if (this.user.currentSession) {
            this.currentSession = this.user.currentSession
        }

        this.subscription = this.ngRedux
            .select(state => state.allUsers.allUsers.filter((u: any) => u.id == this.user.id))
            .subscribe((state: any) => {
                if (state.currentSession) {
                    this.currentSession = state.currentSession
                    // this.currentSession.startTime = new Date(this.currentSession.startTime0)
                }
            })

    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}