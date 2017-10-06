import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'user-sessions-history',
    templateUrl: 'sessions-history.component.html'
})

export class UserSessionsHistoryComponent implements OnInit {
    @Input() sessions;

    constructor() { }

    ngOnInit() { }
}