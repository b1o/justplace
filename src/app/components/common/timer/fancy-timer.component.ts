import { IAppState } from '../../../store/index';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'fancy-timer',
    templateUrl: 'fancy-timer.component.html'
})

export class FancyTimerComponent implements OnInit, AfterViewInit {

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


    public timerSub;
    private interval;


    constructor(private cd: ChangeDetectorRef, private ngRedux: NgRedux<IAppState>) { }

    private scaledValue = (cur) => (100 * cur / 60);

    ngOnInit() {
        console.log(moment.now(), this.startTime)

        //const start = moment( moment.now() - this.startTime)
        const start = moment.duration((moment.now() - this.startTime), 'milliseconds')
        this.hours = Number(start.hours());//Math.floor((moment.now() - this.startTime) / (60000 * 60));

        this.minutes = start.minutes();
        this.sec = start.seconds()
        this.calculatePercentages()

        this.interval = Observable.timer(200, 1000)
        this.timerSub = this.interval.subscribe(tick => {
            this.sec++;

            if (this.sec >= 60) {
                this.minutes++;
                this.sec = 0;
                console.log(this.minPercent)
            }

            if (this.minutes >= 60) {

                this.hours = this.hours + 1;
                this.minutes = 0;
                console.log(this.hours)

            }
            this.calculatePercentages();


            // this.seconds.update(this.percent)
            this.cd.detectChanges()
        })
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