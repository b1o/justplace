import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../../../store/app.state';
import { SidenavComponent } from '../../../typescripts/pro';

@Component({
    selector: 'app-sidenav',
    templateUrl: 'sidenav.component.html'
})

export class AppSidenavComponent implements OnInit {
    @ViewChild('sidenav') sidenav: SidenavComponent

    constructor(private ngRedux: NgRedux<IAppState>) { }

    ngOnInit() {
        this.ngRedux.select(state => state.layout)
            .subscribe(state => {
                if (state.sidenavOpen) {
                    this.sidenav.show()
                } else {
                    this.sidenav.hide()
                }
            })
    }
}