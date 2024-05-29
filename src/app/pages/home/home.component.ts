import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import menuData from '../../../assets/json/menuData.json';
import { MatDialog } from '@angular/material/dialog';
import { AddBookingComponent } from 'src/app/component/add-booking/add-booking.component';
import { ViewBookingComponent } from 'src/app/component/view-booking/view-booking.component';
import { QuickBookComponent } from 'src/app/component/quick-book/quick-book.component';
import { CancelBookingComponent } from 'src/app/component/cancel-booking/cancel-booking.component';
import { SafeValue } from '@angular/platform-browser';
import { CoupenService } from 'src/app/services/coupen.service';
import { QrCodeComponent } from 'src/app/component/qr-code/qr-code.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public users: any = [];
  public fullName: string = '';
  public role!: string;
  selected!: Date | null; // Initialize selected to null
  today!: string;
  menu!: { lunch: string[]; dinner: string[] };
  day: string = ''; // Initialize day variable
  bookingsDate: any[] = [];
  public selectedStartDate!: Date | null;

  isQuickBookingDisabled: boolean = false;
  isCancelBookingDisabled: boolean = false;
  isMealBookingDisabled: boolean = false;

  qrCodeDownloadeLink = '';
  SafeValue = '';
  public qrdata: string = '';
  // coupenCode = "";
  public coupObj = {
    coupenCode: '',
  };
  public userId: any;

  onChange(url: SafeValue) {
    // this.qrCodeDownloadeLink = url;
  }

  // // Example array of dates to highlight
  // startDate = new Date('2024-05-20T18:30:00.000Z');
  // endDate = new Date('2024-05-28T18:30:00.000Z');

  constructor(
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private auth: AuthService,
    private userStore: UserStoreService,
    private dialogRef: MatDialog,
    private coupen: CoupenService,
    private booking: BookingService
  ) {}

  bookings: any = {};

  ngOnInit(): void {
    this.selectedStartDate = new Date();
    this.refreshCalendar();
    this.fetchBookings();

    this.updateButtonStates();
    setInterval(() => this.updateButtonStates(), 60000);

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;

      console.log(fullNameFromToken);
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.selected = new Date();

    const dayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    this.today = days[dayIndex];
    this.menu = (menuData as any)[this.today];
  }

  logout() {
    this.auth.signOut();
  }

  onGenerateQR() {
    const dialogRef = this.dialogRef.open(QrCodeComponent, {
      disableClose: true, // Prevent dialog from closing on outside click
    });
  }

  updateButtonStates() {
    const now = new Date();
    const hours = now.getHours();

    // if ((hours >= 9 && hours < 12) || (hours >= 17 && hours < 21)) {
    //   this.isQuickBookingDisabled = true;
    //   this.isCancelBookingDisabled = true;
    //   this.isMealBookingDisabled = true;
    // } else {
    //   this.isQuickBookingDisabled = false;
    //   this.isCancelBookingDisabled = false;
    //   this.isMealBookingDisabled = false;
    // }
  }

  onDateSelected(date: Date | null): void {
    // Update selected when a date is selected
    this.selected = date || new Date(); // If date is null, set it to today's date

    // Format the selected date to get the day name (e.g., "Monday")
    const dayIndex = this.selected.getDay();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const selectedDay = days[dayIndex];

    // Update the menu based on the selected day
    this.menu = (menuData as any)[selectedDay];
  }

  openDialog() {
    this.dialogRef.open(AddBookingComponent);
  }

  openbooking() {
    this.dialogRef.open(ViewBookingComponent);
  }

  openQuickBooking() {
    this.dialogRef.open(QuickBookComponent);
  }

  cancelBooking() {
    this.dialogRef.open(CancelBookingComponent);
  }

  fetchBookings(): void {
    this.booking.getBookingsByDate().subscribe({
      next: (res) => {
        console.log('Dates ', res);
        if (res.length > 0) {
          this.bookingsDate = res;
          this.refreshCalendar();
          console.log('Ruchir');
          // console.log(this.bookingsDate);
        }
      },
      error: (err) => {
        console.log(err);
        // alert(err.error.message);
        // this.toast.error({detail:"ERROR", summary:err.error.message, duration:5000});
      },
    });
  }

  refreshCalendar() {
    if (this.selectedStartDate) {
      this.selectedStartDate = new Date(this.selectedStartDate.getTime());
    }
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
        const startDate = new Date(booking.bookingStartDate)
          .toISOString()
          .split('T')[0];
        const endDate = new Date(booking.bookingEndDate)
          .toISOString()
          .split('T')[0];
        return dateString >= startDate && dateString <= endDate;
      });

      return isBooked ? 'booked-date' : '';
    };
  }

  disablePastDatesFilter = (d: Date): boolean => {
    const today = new Date(); // Get today's date
    // today.setHours(0, 0, 0, 0); // Set time to start of the day

    // Disable if the date is before today or if it's a weekend (Saturday or Sunday)
    return d > today && d.getDay() !== 0 && d.getDay() !== 6;
  };
}
