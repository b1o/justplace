import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { IAppState } from './store/index';

export const UPDATE_TIME = 'timer/UPDATE';

@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {

  constructor(private ngRedux: NgRedux<IAppState>) { }

  updateCurrentTime() {
    let timer = Observable.timer(1000, 1000);
    timer.subscribe(t => this.ngRedux.dispatch({ type: UPDATE_TIME }));
  }

  ngOnInit() {

    //this.updateCurrentTime();
  }
}
