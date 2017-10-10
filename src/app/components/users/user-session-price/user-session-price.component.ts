import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { IAppState } from '../../../store/index';

@Component({
    selector: 'user-session-price',
    templateUrl: 'user-session-price.component.html'
})

export class UserSessionPriceComponent implements OnInit, OnDestroy {
    @Input() userId;

    public price = 0;
    private sub;

    constructor(private ngRedux: NgRedux<IAppState>, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.sub = this.ngRedux.select(state => state.allUsers.allUsers.find((u: any) => u.id === this.userId))
            .filter(u => u != null)
            .subscribe((state: any) => {
                this.price = state.price
            })
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}