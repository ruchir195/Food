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



  // Assuming start and end dates
  startDate = new Date('2024-05-27T13:00:00.000Z');
  endDate = new Date('2024-05-30T13:00:00.000Z');

  // startDate!: Date;
  // endDate!: Date;
  // datesToHighlight: string[] = [];
  // startingDate!: Date;
  // endingDate!: Date;


  datesToHighlight: string[] = this.generateDatesInRange(
    this.startDate,
    this.endDate
  );

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewBookingComponent>,
    private booking: BookingService,
    private toast: NgToastService,
    private router: Router
  ) {}

  closeForm() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.booking.getBookingsByDate().subscribe({
      next:(res=>{    
        console.log("Dates ",res);
        if (res.length > 0) {
          this.startDate = new Date(res[0].bookingStartDate);
          this.endDate = new Date(res[0].bookingEndDate);
          console.log(this.startDate.toISOString());
          console.log(this.endDate.toISOString());
          // this.startingDate = new Date(this.startDate.toISOString());
          // this.endingDate = new Date(this.endDate.toISOString());
          this.datesToHighlight = this.generateDatesInRange(this.startDate, this.endDate);
          console.log("Dates to highlight: ", this.datesToHighlight);
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



 

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return '';
      }

      const highlightDate = this.datesToHighlight
        .map((strDate) => new Date(strDate))
        .some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );

        // console.log("high: ", highlightDate, date);
      return highlightDate ? 'special-date' : '';
    };
  }

  // Function to generate dates between start and end date
  generateDatesInRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString());
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    }
    console.log("date: ",dates);
    return dates;
  }
}
