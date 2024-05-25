import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl:string = "https://localhost:7246/api/Booking/";
 
  
  constructor(private http: HttpClient, private router: Router) 
  {
    
  }



  book(bookObj:any){
    console.log("services: ",bookObj);
    let email = localStorage.getItem("email");
    const bookingObject = {
      email: email,
      category: bookObj.category,
      bookingType: bookObj.mealType,
      bookingDate: new Date(),
      bookingStartDate: bookObj.dates.start,
      bookingEndDate: bookObj.dates.end
    }

    console.log(bookingObject)
    return this.http.post<any>(`${this.baseUrl}MealBooking`, bookingObject);
  }




  getBookingsByDate(): Observable<any> {
    const email = localStorage.getItem('email');
    if (!email) {
      throw new Error('Email not found in localStorage');
    }
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.baseUrl}ViewBooking`, { params });
  }
}
