import { Subscription } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit, ViewChild } from '@angular/core';

import { IAppState } from '../../../store/app.state';
import { SidenavComponent } from '../../../typescripts/pro';

@Component({
    selector: 'app-sidenav',
    templateUrl: 'sidenav.component.html'
})

export class AppSidenavComponent implements OnInit {
    @ViewChild('sidenav') sidenav: SidenavComponent
    private subscription: Subscription

    constructor(private ngRedux: NgRedux<IAppState>) { }

    ngOnInit() {
        this.subscription = this.ngRedux.select(state => state.layout)
            .subscribe(state => {
                if (state.sidenavOpen) {
                    this.sidenav.show()
                } else {
                    this.sidenav.hide()
                }
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}