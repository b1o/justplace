import { UsersService } from '../../services/users.service';
import { ToastService } from '../../typescripts/pro/alerts/index';
import { NetworkService } from '../../services/network.service';
import { ModalDirective } from '../../typescripts/free/modals/index';
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'start-modal',
    templateUrl: 'startModal.component.html'
})
export class StartModalComponent {
    @ViewChild('form') startForm: ModalDirective

    private id;
    private userCount = 1;
    private description = '';

    constructor(
        private networkService: NetworkService,
        private toastService: ToastService,
        private usersService: UsersService
    ) { }

    open(id) {
        this.id = id
        this.startForm.show()
    }

    onHide() {
        this.userCount = 1;
    }

    plus() {
        this.userCount++;
    }

    minus() {
        if (this.userCount > 1) {
            this.userCount--;
        }
    }

    start() {
        let data = {
            description: this.description,
            userCount: this.userCount,
            user: {
                id: this.id
            }
        };
        
        this.usersService  
            .start(data, this.startForm)
    }
}