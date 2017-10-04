import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';

import { IAppState } from '../../../store/app.state';

@Component({
    selector: 'timer',
    templateUrl: 'timer.component.html'
})

export class TimerComponent implements OnInit {
    @Input() currentTime;

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {
        console.log('timer Component')
    }

    ngOnInit() {
        console.log(this.currentTime)
    }
}