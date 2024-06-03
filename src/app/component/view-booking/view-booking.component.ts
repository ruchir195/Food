import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
export class ViewBookingComponent implements OnInit {
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
  ) { }

  bookings: any = {};

  closeForm() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.selectedStartDate = new Date();
    this.fetchBookDays();
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
      const isBooked = this.bookingsDate.some((booking) => {
        const startDate = new Date(booking.bookingStartDate).toISOString().split('T')[0];
        const endDate = new Date(booking.bookingEndDate).toISOString().split('T')[0];
        return dateString >= startDate && dateString <= endDate;
      });

      return isBooked ? 'booked-date' : '';
    };
  }

  fetchBookDays(): void {
    this.booking.getBookingsByDate().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.bookingsDate = res;
          this.countBookedDaysInDisplayedMonth(); // Call to count booked days in the displayed month
        }
      },
      error: (err) => {
        console.log(err);
        this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000 });
      }
    });
  }

  onSelect(event: any) {
    this.selectedDate = event;
  }

  countBookedDaysInDisplayedMonth(): void {
    this.bookedDayCount = 0; // Reset count before calculating
    const currentMonth = this.displayedMonth;
    const currentYear = this.displayedYear;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let bookedDays = new Set<string>();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];

      this.bookingsDate.forEach((booking) => {
        const startDate = new Date(booking.bookingStartDate).toISOString().split('T')[0];
        const endDate = new Date(booking.bookingEndDate).toISOString().split('T')[0];
        if (dateString >= startDate && dateString <= endDate) {
          bookedDays.add(dateString);
        }
      });
    }

    this.bookedDayCount = bookedDays.size - 2;
    console.log(`Number of booked days in the displayed month: ${this.bookedDayCount}`);
  }

  onMonthSelected(event: Date): void {
    this.displayedMonth = event.getMonth();
    this.displayedYear = event.getFullYear();
    this.countBookedDaysInDisplayedMonth();
  }

  onYearSelected(event: Date): void {
    this.displayedMonth = event.getMonth();
    this.displayedYear = event.getFullYear();
    this.countBookedDaysInDisplayedMonth();
  }

  refreshCalendar() {
    this.countBookedDaysInDisplayedMonth(); // Update count when the calendar is refreshed
  }
}
