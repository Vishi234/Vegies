import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';

@Injectable({
    providedIn: 'root'
})
export class setScheduler {
    constructor(private http: HttpClient, private _global: AppGlobals) { }
    private _addSchedulerURL = this._global.baseAppUrl + 'configProduct/setScheduler';
    private _getSchedulerURL = this._global.baseAppUrl + 'configProduct/getScheduleList';

    addScheduler(configProductList: any) {
        return this.http.post<any>(this._addSchedulerURL, configProductList);
    }

    // getScheduleList(userId: any) {
    //     return this.http.get(this._getSchedulerURL, {
    //         params: {
    //             userId: userId._id,
    //         }
    //     })
    // }
}