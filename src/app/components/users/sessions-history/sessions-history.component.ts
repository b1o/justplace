import { PaymentModalComponent } from '../../modal/paymentModal.component';
import * as moment from 'moment';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'user-sessions-history',
    templateUrl: 'sessions-history.component.html'
})

export class UserSessionsHistoryComponent implements OnInit {
    @Input() user;
    @Input() sessions;
    @ViewChild(PaymentModalComponent) paymentModal: PaymentModalComponent;

    constructor() { }

    ngOnInit() {
        console.log(this.sessions)
        this.sessions = this.sessions.filter(s => s.endTime != null).map(s => {
            let duration = moment.duration(s.endTime - s.startTime).format('hh:mm:ss', {trim: false})
            let timeInHours = ((s.endTime - s.startTime) / 1000) / 3600;
            let price = (timeInHours*s.pricePerHour*s.userCount).toFixed(2);
            return { ...s, duration: duration, price: price }
        })
    }

    ngOnChange(changes: SimpleChanges) {
        if(changes.sessions) {
            console.log('somting')
        }
    }
}