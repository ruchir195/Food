import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css'],
})
export class ViewBookingComponent {


  selectedDate: any;
  public selectedStartDate!: Date | null;
  bookingsDate: any[] = [];
  bookedDayCount: number = 0;
  displayedMonth: number = new Date().getMonth();
  displayedYear: number = new Date().getFullYear();

  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewBookingComponent>,
    private booking: BookingService,
    private toast: NgToastService,
    private router: Router
  ) {}

  bookings: any = {};
  closeForm() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.selectedStartDate = new Date();
    this.refreshCalendar();
    this.fetchBookings();
    
  }


  dateClassV2() {
    return (date: Date): MatCalendarCellCssClasses => {
      const day = date.getDay();
      const isSaturday = day === 6;
      const isSunday = day === 0;
  
      if (isSaturday || isSunday) {
        return 'weekend-date';
      }
  
      const dateString = date.toISOString().split('T')[0];
      const isBooked = this.bookingsDate.some(booking => {
        const startDate = new Date(booking.bookingStartDate).toISOString().split('T')[0];
        const endDate = new Date(booking.bookingEndDate).toISOString().split('T')[0];
        return dateString >= startDate && dateString <= endDate;
      });


      if (isBooked) {
        this.bookedDayCount++;
      }
      return isBooked ? 'booked-date' : '';   
    };
  }

  fetchBookings(): void {
    this.booking.getBookingsByDate().subscribe({
      next:(res=>{    
        console.log("Dates ",res);
        if (res.length > 0) {
          this.bookingsDate = res;
          console.log(this.bookingsDate);
          this.refreshCalendar();
          this.updateBookedDayCount();
          // this.startDate = new Date(res[0].bookingStartDate);
          // this.endDate = new Date(res[0].bookingEndDate);
          // console.log(this.startDate.toISOString());
          // console.log(this.endDate.toISOString());
          // // this.startingDate = new Date(this.startDate.toISOString());
          // // this.endingDate = new Date(this.endDate.toISOString());
          // this.datesToHighlight = this.generateDatesInRange(this.startDate, this.endDate);
          // console.log("Dates to highlight: ", this.datesToHighlight);
        }
        
      }),
      error:(err=>{
        console.log(err);
        // alert(err.error.message);
        this.toast.error({detail:"ERROR", summary:err.error.message, duration:5000});

      })
    })
  }

  onSelect(event: any) {
    console.log(event);
    this.selectedDate = event;
  }


  updateBookedDayCount() {
    const startOfMonth = new Date(this.displayedYear, this.displayedMonth, 1);
    const endOfMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0);

    this.bookedDayCount = this.bookingsDate.filter(booking => {
      const bookingStartDate = new Date(booking.bookingStartDate);
      const bookingEndDate = new Date(booking.bookingEndDate);

      // Check if the booking is within the current displayed month
      return (
        (bookingStartDate >= startOfMonth && bookingStartDate <= endOfMonth) ||
        (bookingEndDate >= startOfMonth && bookingEndDate <= endOfMonth) ||
        (bookingStartDate <= startOfMonth && bookingEndDate >= endOfMonth)
      );
    }).length;
  }


  refreshCalendar() {
    this.selectedStartDate = new Date(this.selectedStartDate!.getTime());
    this.updateBookedDayCount();
  }

  onMonthSelected(event: Date) {
    this.displayedMonth = event.getMonth();
    this.displayedYear = event.getFullYear();
    this.updateBookedDayCount();
  }


 

}
