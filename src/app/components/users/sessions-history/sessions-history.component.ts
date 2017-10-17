import { Subscription } from 'rxjs/Rx';
import { IAppState } from '../../../store/index';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { PaymentModalComponent } from '../../modal/paymentModal.component';
import * as moment from 'moment';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'user-sessions-history',
    templateUrl: 'sessions-history.component.html'
})

export class UserSessionsHistoryComponent implements OnInit {
    // @Input() user;
    // @Input() sessions;
    public user;
    public sessions;
    private subs: Subscription;
    @ViewChild(PaymentModalComponent) paymentModal: PaymentModalComponent;

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) { }

    ngOnInit() {
        this.subs = this.ngRedux
            .select(state => state.allUsers.selectedUser)
            .subscribe(user => {
                this.user = user;
                this.sessions = user['sessions'];

                this.sessions = this.sessions.filter(s => s.endTime != null).map(s => {
                    let duration = moment.duration(s.endTime - s.startTime).format('hh:mm:ss', {trim: false})
                    let timeInHours = ((s.endTime - s.startTime) / 1000) / 3600;
                    let price = (timeInHours*s.pricePerHour*s.userCount).toFixed(2);
                    return { ...s, duration: duration, price: price }
                })
            })
        // console.log(this.sessions)
        
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}