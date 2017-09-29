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
        private toastService: ToastService
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
        if (data.userCount > 0) {
            let url = 'timer/' + this.id;
            
            this.networkService
                .post(url, data)
                .subscribe(res => {
                    this.startForm.hide()
                    console.log(res)
                })
        } else {
            this.toastService.info('Броя играчи трябва да е поне 1!')
        }
    }
}