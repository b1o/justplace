import * as moment from 'moment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'user-sessions-history',
    templateUrl: 'sessions-history.component.html'
})

export class UserSessionsHistoryComponent implements OnInit {
    @Input() sessions;

    constructor() { }

    ngOnInit() {
        console.log(this.sessions)
        this.sessions = this.sessions.filter(s => s.endTime != null).map(s => {
            let duration = moment.duration(s.endTime - s.startTime).format('hh:mm:ss', {trim: false})
            return { ...s, duration: duration }
        })
    }
}