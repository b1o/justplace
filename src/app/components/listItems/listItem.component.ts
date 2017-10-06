import { StopModalComponent } from '../modal/stopModal.component';
import { Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/app.state';
import { StartModalComponent } from '../modal/startModal.component';

import { pricePerHour } from '../modal/stopModal.component';

@Component({
    selector: 'list-item',
    templateUrl: 'listItem.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ListItemComponent implements OnInit {
    @Input() user;
    @ViewChild(StartModalComponent) startModal: StartModalComponent;
    @ViewChild(StopModalComponent) stopModal: StopModalComponent;

    private subscription: Subscription;
    private time;
    private price = '0';
    private minutes = 0;

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

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

                    this.minutes = (data.currentTime - this.user.currentSession.startTime) / 60000;
                    this.price = ((this.minutes / 60) * pricePerHour).toFixed(2);
                }
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}