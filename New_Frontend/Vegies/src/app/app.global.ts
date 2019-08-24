import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = "http://localhost:8080/api/";
    readonly baseImgUrl: string = "http://localhost:8080/";
   // readonly baseAPIUrl: string = 'https://api.github.com/';
}