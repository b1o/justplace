import { Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/app.state';
import { StartModalComponent } from '../modal/startModal.component';

@Component({
    selector: 'list-item',
    templateUrl: 'listItem.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ListItemComponent implements OnInit {
    @Input() user;
    @ViewChild(StartModalComponent) startModal: StartModalComponent;

    private subscription: Subscription;
    private time;

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    stop(id) {
        this.usersAction.stop(id)
    }

    getGameTime(startTime, currentTime) {
        let miliseconds = currentTime - startTime;
        let hours = Math.floor(miliseconds / (60000 * 60));
        let minutes = Math.floor((miliseconds / 60000) % 60);
        let seconds = Number(((miliseconds % 60000) / 1000).toFixed(0));
        return hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    ngOnInit() {
        this.subscription = this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                if (this.user.currentSession) {
                    this.time = this.getGameTime(this.user.currentSession.startTime, data.currentTime)
                }
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}