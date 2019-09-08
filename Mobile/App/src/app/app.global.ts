import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = "http://192.168.0.104:8084/api/";
    readonly baseImgUrl: string = "http://192.168.0.104:8084/";
   // readonly baseAPIUrl: string = 'https://api.github.com/';
}