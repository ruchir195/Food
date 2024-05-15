import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7246/api/User/"
  private userPayload:any;
  
  constructor(private http: HttpClient, private router: Router) 
  {
    this.userPayload = this.decodedToken();
  }



  signUp(userObj:any){
    console.log("services: ",userObj);
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj:any){
    console.log("services: ",loginObj);
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  }


  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }


  forgetPassword(forgetObject:any){
    return this.http.post<any>(`${this.baseUrl}forgetpassword`, forgetObject);
  }


  otp(otpObject:any){
    return this.http.post<any>(`${this.baseUrl}otp`, otpObject);
}


newPassword(newPasswordObj: any){
  return this.http.post<any>(`${this.baseUrl}newPassword`, newPasswordObj);
}


  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue);
  }


  getToken(){
    return localStorage.getItem('token');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }


  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }


  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }


  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }

  renewToken(tokenApi: TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  }
}
