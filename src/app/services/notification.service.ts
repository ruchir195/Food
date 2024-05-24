import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl:string = "https://localhost:7246/api/";
  
  
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
}
