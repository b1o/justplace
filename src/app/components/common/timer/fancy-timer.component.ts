import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { TimerService } from '../../../services/timer.service';
import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';

@Component({
    selector: 'fancy-timer',
    templateUrl: 'fancy-timer.component.html'
})

export class FancyTimerComponent implements OnInit, AfterViewInit {
    @Input() userId;
    @Input() startTime;

    public sec = 50;
    public minutes = 59;
    public hours = 0;

    public secPercent = 1;
    public minPercent = 1;
    public hourPercent = 1;

    public options = {
        barColor: '#ef1e25',
        trackColor: '#f9f9f9',
        scaleColor: '#dfe0e0',
        scaleLength: 5,
        lineCap: 'round',
        lineWidth: 3,
        size: 110,
        rotate: 0,
        animate: {
            duration: 500,
            enabled: true
        }
    };

    public price = '0';
    public timerSub;

    constructor(private cd: ChangeDetectorRef, private ngRedux: NgRedux<IAppState>, private timerService: TimerService, private userActions: UsersAction) { }

    private scaledValue = (cur) => (100 * cur / 60);

    ngOnInit() {

        
        this.calculatePercentages()

        this.timerSub = this.timerService.getTimer().subscribe(tick => {
            const start = moment.duration((this.ngRedux.getState().allUsers.currentTime - this.startTime), 'milliseconds')

            this.hours = Number(start.hours());
    
            this.minutes = start.minutes();
            this.sec = start.seconds()

            this.calculatePercentages();

            this.userActions.updateUserPrice(this.price, this.userId)
            // this.seconds.update(this.percent)
            this.cd.detectChanges()
        });
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
        if (this.timerSub) this.timerSub.unsubscribe()
    }

    private calculatePercentages() {
        this.minPercent = this.scaledValue(this.minutes);
        this.hourPercent = this.scaledValue(this.hours);
        this.secPercent = this.scaledValue(this.sec);
    }
}