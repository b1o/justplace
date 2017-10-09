import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import { TimerService } from '../../../services/timer.service';

@Component({
    selector: 'basic-timer',
    templateUrl: 'basic-timer.component.html'
})

export class BasicTimerComponent implements OnInit, OnDestroy {
    @Input() startTime;

    public time;
    public sec = 0;
    public minutes = 0;
    public hours = 0;

    private currentTime;
    private sub;

    constructor(private timerService: TimerService) { }

    getTimeString() {
        return ((this.hours <= 9 ? '0' + this.hours : this.hours) + ':' +
            (this.minutes <= 9 ? '0' + this.minutes : this.minutes) + ':' +
            (this.sec <= 9 ? '0' + this.sec : this.sec)
        )
    }

    ngOnInit() {
        const start = moment.duration((moment.now() - this.startTime), 'milliseconds')
        this.hours = Number(start.hours());

        this.minutes = start.minutes();
        this.sec = start.seconds()
        if (this.startTime) {
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
                        console.log(this.hours)

                    }

                    this.time = this.getTimeString()
                })
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}