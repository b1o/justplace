import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TimerService {

    private globalTick;

    constructor() {
        this.globalTick = Observable.timer(0, 1000);

    }

    public getTimer(): Observable<number> {
        return this.globalTick;
    }

}