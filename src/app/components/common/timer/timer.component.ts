import { IAppState } from '../../../store/app.state';
import { NgRedux } from 'ng2-redux';
import { Component, Input, OnInit } from '@angular/core';

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