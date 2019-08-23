import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = "http://192.168.0.102:8080/api/";
    readonly baseImgUrl: string = "http://192.168.0.102:8080/";
   // readonly baseAPIUrl: string = 'https://api.github.com/';
}