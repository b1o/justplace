import { NgRedux } from '@angular-redux/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../store/actions/users.action';
import { IAppState } from '../../store/index';
import { ModalDirective } from '../../typescripts/free/modals/index';

export const pricePerHour = 10;

@Component({
    selector: 'stop-modal',
    templateUrl: 'stopModal.component.html'
})

export class StopModalComponent implements OnInit {

    @ViewChild('form') stopForm: ModalDirective;
    private subscription: Subscription;
    private user;
    private time;
    private minutes = 0;
    private price = '0';
    private id;

    constructor(
        private usersAction: UsersAction,
        private ngRedux: NgRedux<IAppState>
    ) { }

    open(user) {
        this.user = user;
        this.id = user.id;
        this.subscription = this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                if (this.user.currentSession) {
                    this.time = this.getGameTime(this.user.currentSession.startTime, data.currentTime === 0 ? this.user.currentSession.now : data.currentTime);
                }

                this.minutes = ((data.currentTime === 0 ? this.user.currentSession.now : data.currentTime) - this.user.currentSession.startTime) / 60000;

                this.price = ((this.minutes / 60) * pricePerHour).toFixed(2);
            })
        this.stopForm.show();
    }

    stop() {
        this.subscription.unsubscribe()
        this.usersAction.stop(this.id);
        this.stopForm.hide();
    }

    getGameTime(startTime, currentTime) {
        let miliseconds = currentTime - startTime;
        let hours = Math.floor(miliseconds / (60000 * 60));
        let minutes = Math.floor((miliseconds / 60000) % 60);
        let seconds = Number(((miliseconds % 60000) / 1000).toFixed(0));
        return hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    ngOnInit() {

    }
}