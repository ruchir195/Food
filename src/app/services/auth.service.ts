import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7246/api/User/";
  private userPayload:any;
  private unique_name: string | null = null;
  private jwtHelper = new JwtHelperService();
  
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



changePassword(changePasswordObj:any ){
  const email = localStorage.getItem('email');
  var changepassword = {
    email: email,
    opassword: changePasswordObj.opassword,
    password: changePasswordObj.cpassword
  }
  console.log(changepassword);
  console.log(this.http.post<any>(`${this.baseUrl}changePassword`, changepassword))
  return this.http.post<any>(`${this.baseUrl}changePassword`, changepassword);
}


  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string){+
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


  // decodedToken(){
  //   const jwtHelper = new JwtHelperService();
  //   const token = this.getToken()!;
  //   console.log("jwt: ",jwtHelper.decodeToken(token));
  //   this.unique_name = jwtHelper.decodeToken(token).unique_name;
  //   return jwtHelper.decodeToken(token);
  // }


  decodedToken() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log('jwt: ', decodedToken);
        this.unique_name = decodedToken.unique_name; // Ensure this matches your token structure
        return decodedToken;
      } catch (error) {
        console.error('Error decoding token: ', error);
        return null;
      }
    } else {
      console.warn('No token found');
      return null;
    }
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


  getUniqueName(): string | null {
    if (!this.unique_name) {
      this.decodedToken();
    }
    return this.unique_name;
  }


  getUserDetails(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${email}`);
  }

 
}
