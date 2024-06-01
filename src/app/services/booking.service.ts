import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl:string = "https://localhost:7246/api/Booking/";
 
  
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) 
  {
    
  }



  book(bookObj:any){
    console.log("services: ",bookObj);
    // let email = localStorage.getItem("email");
    const token = this.auth.decodedToken();
    // console.log("book email: ",token.email);
    const bookingObject = {
      email: token.email,
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
    // const email = localStorage.getItem('email');
    const token = this.auth.decodedToken();
    // console.log("get booking: ",token.email);
    if (!token) {
      throw new Error('Email not found in localStorage');
    }
    const params = new HttpParams().set('email', token.email);
    return this.http.get(`${this.baseUrl}ViewBooking`, { params });
  }


  cancelBooking(cancelFormObj: any): Observable<any> {
    const token = this.auth.decodedToken();
    // console.log("cancel Booking : ",token.email);
    if (!token) {
      throw new Error('Email not found in localStorage');
    }
    const params = new HttpParams()
    .set('email', token.email)
    .set('bookingtype', cancelFormObj.bookingtype);;
    return this.http.delete<any>(`${this.baseUrl}${cancelFormObj.date.toISOString()}`, { params });
  }




  quickBook(quickBook: any){
    console.log("services: ",quickBook);
    const token = this.auth.decodedToken();
    // console.log("quick booking : ",token.email);
    const bookingObject = {
      email: token.email,
      category: quickBook.category,
      bookingType: quickBook.mealType,
      bookingDate: new Date(),
      bookingStartDate: quickBook.selectedDate
    }

    console.log(bookingObject)
    return this.http.post<any>(`${this.baseUrl}QuickBooking`, bookingObject);
  }
}
