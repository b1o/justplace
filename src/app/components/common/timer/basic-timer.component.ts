import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import { TimerService } from '../../../services/timer.service';
import { UsersAction } from '../../../store/actions/users.action';

@Component({
    selector: 'basic-timer',
    templateUrl: 'basic-timer.component.html'
})

export class BasicTimerComponent implements OnInit, OnDestroy {
    @Input() session;
    @Input() userId;

    public time;
    public sec = 0;
    public minutes = 0;
    public hours = 0;
    public started = false;

    private currentTime;
    private sub;

    constructor(private timerService: TimerService, private userActions: UsersAction, private cd: ChangeDetectorRef) { }

    getTimeString() {
        return ((this.hours <= 9 ? '0' + this.hours : this.hours) + ':' +
            (this.minutes <= 9 ? '0' + this.minutes : this.minutes) + ':' +
            (this.sec <= 9 ? '0' + this.sec : this.sec)
        )
    }

    ngOnInit() {

        this.time = this.getTimeString()
        const start = moment.duration((moment.now() - this.session.startTime), 'milliseconds')
        this.hours = Number(start.hours());

        this.minutes = start.minutes();
        this.sec = start.seconds()
        this.started = true;
        this.sub = this.timerService.getTimer()
            .subscribe(t => {
                this.sec++;

                if (this.sec >= 60) {
                    this.minutes++;
                    this.sec = 0;
                }

                if (this.minutes >= 60) {

                    this.hours = this.hours + 1;
                    this.minutes = 0;

                }

                this.time = this.getTimeString()
                this.userActions.updateUserPrice(null, this.userId)
            })
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}