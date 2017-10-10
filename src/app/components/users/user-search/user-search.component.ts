import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { UsersAction } from '../../../store/actions/users.action';

@Component({
    selector: 'user-search',
    templateUrl: 'user-search.component.html'
})

export class UserSearchComponent implements OnInit {

    public term: Subject<any> = new Subject<any>();

    constructor(private usersActions: UsersAction) {
        this.term
            .asObservable()
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(t => {
                this.usersActions.searchUser(t)
            })
    }

    ngOnInit() { }
}