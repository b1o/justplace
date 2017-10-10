import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { UsersAction } from '../../../store/actions/users.action';
import { IAppState } from '../../../store/index';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html'
})

export class PaginationComponent implements OnInit {
    public response;
    public allPages;
    public totalPages;
    public currentPage;
    public subscription: Subscription;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private usersActions: UsersAction
    ) { }

    changePage(page) {
        let url = `users?page=${page}`;
        this.usersActions
            .changePage(url)
    }

    ngOnInit() {
        this.subscription = this.ngRedux
            .select(state => state.allUsers)
            .subscribe(data => {
                this.response = data;
                this.allPages = Array(this.response.totalPages).fill(0);
                this.totalPages = data.totalPages;
                this.currentPage = data.currentPage;
            })

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}