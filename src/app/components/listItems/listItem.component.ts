import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { NetworkService } from '../../services/network.service';
import { StartModalComponent } from '../modal/startModal.component';

@Component({
    selector: 'list-item',
    templateUrl: 'listItem.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ListItemComponent implements OnInit {
    @Input() user;
    @ViewChild(StartModalComponent) startModal: StartModalComponent;

    constructor(
        private networkService: NetworkService
    ) { }



    ngOnInit() {
    }

    // stop(id) {
    //     this.usersService.stop(id)
    //     this.usersService
    //         .userData
    //         .subscribe(data => {
    //             if (data["status"]) {
    //                 this.user.currentSession = null
    //             }
    //         })
    // }


}