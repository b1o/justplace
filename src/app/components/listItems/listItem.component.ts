import { UsersService } from '../../services/users.service';
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
        private networkService: NetworkService,
        private usersService: UsersService
    ) {
        this.usersService.userData.subscribe(data => {
            console.log('got', data, this.user.id)
            if (data['status']) {
                if (this.user.id === data['id']) {
                    this.user.currentSession = {
                        user: null,
                        description: null,
                        startTime: data['startTime'],
                        endTime: null,
                        userCount: 0
                    }
                }
            }
        })
    }

    ngOnInit() {

    }

    stop(id) {
        this.usersService.stop(id)
        this.usersService
            .userData
            .subscribe(data => {
                if (data["status"]) {
                    this.user.currentSession = null
                }
            })
    }
}