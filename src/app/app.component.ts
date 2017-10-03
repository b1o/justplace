import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from './store/index';
import { SidenavComponent } from './typescripts/pro';

export const UPDATE_TIME = 'timer/UPDATE';

@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: SidenavComponent;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  updateCurrentTime() {
    let timer = Observable.timer(1000, 1000);
    timer.subscribe(t => this.ngRedux.dispatch({type: UPDATE_TIME}));
  }

  ngOnInit() {
    this.ngRedux
      .select(state => state.layout)
      .subscribe(state => {
        if (state.sidenavOpen) {
          this.sidenav.show();
        } else {
          this.sidenav.hide();
        }
      });

    this.updateCurrentTime();
  }
}
