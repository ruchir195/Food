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
  selected!: Date | null;
  today!: string;
  menu!: { lunch: string[]; dinner: string[] };
  day: string = '';
  bookingsDate: any[] = [];
  public selectedStartDate!: Date | null;

  isQuickBookingDisabled: boolean = false;
  isCancelBookingDisabled: boolean = false;
  isMealBookingDisabled: boolean = false;
  isGenerateQRDisabled: boolean = false;

  qrCodeDownloadeLink = '';
  SafeValue = '';
  public qrdata: string = '';
  public coupObj = {
    coupenCode: '',
  };
  public userId: any;

  onChange(url: SafeValue) { }

  constructor(
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private auth: AuthService,
    private userStore: UserStoreService,
    private dialogRef: MatDialog,
    private coupen: CoupenService,
    private booking: BookingService
  ) { }

  bookings: any = {};

  ngOnInit() {
    this.selectedStartDate = new Date();
    this.fetchBookings();
    this.refreshCalendar();

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.selected = new Date();

    const dayIndex = new Date().getDay();
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

    this.updateButtonStates();
    setInterval(() => this.updateButtonStates(), 60000);
  }

  logout() {
    this.auth.signOut();
  }

  onGenerateQR() {
    const dialogRef = this.dialogRef.open(QrCodeComponent, {
      disableClose: true,
    });
    this.isGenerateQRDisabled = true;

    setTimeout(() => {
      this.isGenerateQRDisabled = false;
    }, 120000);
  }

  updateButtonStates() {
    this.checkBookingsForSelectedDate();
  }

  checkBookingsForSelectedDate() {
    if (!this.selectedStartDate) {
      this.isCancelBookingDisabled = true;
      this.isGenerateQRDisabled = true;
      return;
    }

    const selectedDateString = this.selectedStartDate
      .toISOString()
      .split('T')[0];
    const todayString = new Date().toISOString().split('T')[0];
    const hasBooking = this.bookingsDate.some((booking) => {
      const startDate = new Date(booking.bookingStartDate)
        .toISOString()
        .split('T')[0];
      const endDate = new Date(booking.bookingEndDate)
        .toISOString()
        .split('T')[0];
      return selectedDateString >= startDate && selectedDateString <= endDate;
    });

    this.isCancelBookingDisabled = !hasBooking;
    this.isGenerateQRDisabled = !(
      hasBooking && selectedDateString === todayString
    );
  }

  onDateSelected(date: Date | null): void {
    this.selected = date || new Date();
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
    this.menu = (menuData as any)[selectedDay];

    this.selectedStartDate = date;
    this.checkBookingsForSelectedDate();
  }

  openDialog() {
    const dialogRef = this.dialogRef.open(AddBookingComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchBookings(); // Fetch bookings after dialog is closed
    });
  }

  openbooking() {
    const dialogRef = this.dialogRef.open(ViewBookingComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchBookings(); // Fetch bookings after dialog is closed
    });
  }

  openQuickBooking() {
    const dialogRef = this.dialogRef.open(QuickBookComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchBookings(); // Fetch bookings after dialog is closed
    });
  }

  cancelBooking() {
    const dialogRef = this.dialogRef.open(CancelBookingComponent, {
      data: { selectedDate: this.selectedStartDate }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchBookings(); // Fetch bookings after dialog is closed
    });
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

  fetchBookings(): void {
    this.booking.getBookingsByDate().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.bookingsDate = res;
          console.log("res: ", res);
          this.refreshCalendar();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  refreshCalendar() {
    this.selectedStartDate = new Date(this.selectedStartDate!.getTime());
    this.dateAdapter.setLocale('en-US');
  }

  disablePastDatesFilter = (d: Date): boolean => {
    const today = new Date();
    return d > today && d.getDay() !== 0 && d.getDay() !== 6;
  };
}
