import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoupenService {

  private coupenUrl: string = "https://localhost:7246/api/Coupen/"

  constructor(private http: HttpClient, private router: Router) { }




  addCoupon(coupObj: any): Observable<any> {
    const email = localStorage.getItem("email");
    console.log(email);
    var coupenObject = {
      coupObj: coupObj,
      email: email
    }
    console.log("coupenObject: ",coupenObject);
    
    return this.http.post<any>(`${this.coupenUrl}AddData`, coupenObject);
  }

  getCoupon(id: number): Observable<any> {
    return this.http.get<any>(`${this.coupenUrl}${id}`);
  }

  
}
