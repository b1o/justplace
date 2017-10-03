import { observable } from 'rxjs/symbol/observable';
import { ToastService } from '../typescripts/pro/alerts/index';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class NetworkService {

    constructor(private http: Http, 
                private toastService: ToastService) { }
    
    get (url, authenticated = false) {
        const options = {withCredentials: true};

        return this.http.get(`${environment.backEndBaseUrl}${url}`, options)
                 .map(this.extractData.bind(this))
                 .catch(err => {
                     this.toastService.error("Нещо се обърка!"); 
                     return Observable.throw(err)
                    })
    }

    post (url, body) {
        const options = {withCredentials: true};
        
        return this.http.post(`${environment.backEndBaseUrl}${url}`, body, options)
            .map(this.extractData.bind(this))
            .catch(err => {
                if (err.obj) {
                    this.toastService.error(err.obj); 
                } else {
                    this.toastService.error("Нещо се обърка!"); 
                }
                return Observable.throw(err)
            })
    }

    extractData (response: Response) {
        let res = response.json();
        
        if (!res.status) {
            throw res
        }
    
        return res
    }
}