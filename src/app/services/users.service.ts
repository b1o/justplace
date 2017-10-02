import { ToastService } from '../typescripts/pro/alerts/index';
import { NetworkService } from './network.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IUsersData } from '../interfaces/IUsersData'

@Injectable()
export class UsersService {
    public userData: Subject<IUsersData> = new Subject<IUsersData>();

    constructor(
        private networkService: NetworkService,
        private toastService: ToastService
    ) { }

    start (data, startForm) {

        if (data.userCount > 0) {
            let url = 'timer/' + data.user.id;
            
            this.networkService
                .post(url, data)
                .subscribe(res => {
                    startForm.hide()
                    let obj = {...res, id: data['user']['id']}
                    this.userData.next(res)
                })
        } else {
            this.toastService.info('Броя играчи трябва да е поне 1!')
        }
    }

    stop (id) {
        
        let url = `timer/${id}/stop`;
        
        this.networkService
            .post(url, {})
            .subscribe(res => {
                this.userData.next({...res, id})
            })
    }
}