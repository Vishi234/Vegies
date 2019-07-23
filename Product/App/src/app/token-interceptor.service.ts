import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {LoginService} from './vendor/login/login.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(request, next) {
    let _loginService=this.injector.get(LoginService);
    let headers = request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${_loginService.getToken()}`);

    const cloneReq = request.clone({ headers });

    return next.handle(cloneReq);
}
  // intercept(req,next){
  //   let _loginService=this.injector.get(LoginService);
  //   console.log("request-------->",req);
  //   let tokenizedReq=req.clone({
  //     setHeader:{
  //       Authorization:'Bearer xx.yy.zz'
  //       //Authorization:`Bearer ${_loginService.getToken()}`
  //     }
  //   })
  //   return next.handle(tokenizedReq);
  // }
}
