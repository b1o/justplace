import { Observable, Subscription } from 'rxjs/Rx';
import { StartModalComponent } from '../modal/startModal.component';
import { NetworkService } from '../../services/network.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'list-item',
    templateUrl: 'listItem.component.html'
})

export class ListItemComponent implements OnInit {
    @Input() user;
    @ViewChild(StartModalComponent) startModal: StartModalComponent;

    constructor(
        private networkService: NetworkService
    ) {}

    

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