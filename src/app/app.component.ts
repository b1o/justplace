import { SettingsActions } from './store/actions/settings.actions';
import { UPDATE_TIME } from './components/usersList/allUsers.component';
import { Observable } from 'rxjs/Rx';
import { IAppState } from './store/index';
import { NgRedux } from '@angular-redux/store';
import { UsersAction } from './store/actions/users.action';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  private timerSubscription;
  constructor(
    private usersAction: UsersAction,
    private settingsActions: SettingsActions,
    private ngRedux: NgRedux<IAppState>
  ) { }

  updateCurrentTime() {
    let timer = Observable.timer(0, 1000);
    this.timerSubscription = timer.subscribe(t => this.ngRedux.dispatch({ type: UPDATE_TIME }));      
  }

  ngOnInit() {
    // this.usersAction.getAllUsers('users');
    // this.settingsActions.getPrice();

    this.updateCurrentTime()
  }

  
  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
