import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl:string = "https://localhost:7246/api/Notification/";
  
  
  constructor(private http: HttpClient, private router: Router) 
  {
    
  }

  notification(notObj:any){

    const email = localStorage.getItem("email");
    console.log(email);
    var notificationObject = {
      notmsg: notObj,
      email: email,
      dateTime: new Date(),
    }
    console.log("services: ",notObj);
    console.log("ser: ",notificationObject);
    return this.http.post<any>(`${this.baseUrl}Notification`, notificationObject);
  }



  getNotifications(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}GetNotifications`, { params: { email } });
  }



  
}
