import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public fullName: string = '';
  public role!: string;
  selected!: Date | null; // Initialize selected to null
  today!: string;
  menu!: { lunch: string[]; dinner: string[] };
  day: string = ''; // Initialize day variable
  // datesToBeHighlighted: string[] = ['2024-05-20', '2024-05-25'];

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

  // Example array of dates to highlight
  datesToHighlight = [
    '2024-05-23T18:30:00.000Z',
    '2024-05-24T18:30:00.000Z',
    '2024-05-25T18:30:00.000Z',
    '2024-05-26T18:30:00.000Z',
    '2024-05-27T18:30:00.000Z',
    '2024-05-28T18:30:00.000Z',
    '2024-05-29T18:30:00.000Z',
    '2024-05-20T18:30:00.000Z',
  ];

  constructor(
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private auth: AuthService,
    private userStore: UserStoreService,
    private dialogRef: MatDialog,
    private coupen: CoupenService
  ) {}

  ngOnInit(): void {
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
    this.dialogRef.open(QrCodeComponent);
  }

  updateButtonStates() {
    const now = new Date();
    const hours = now.getHours();

    if ((hours >= 9 && hours < 12) || (hours >= 17 && hours < 21)) {
      this.isQuickBookingDisabled = true;
      this.isCancelBookingDisabled = true;
      this.isMealBookingDisabled = true;
    } else {
      this.isQuickBookingDisabled = false;
      this.isCancelBookingDisabled = false;
      this.isMealBookingDisabled = false;
    }
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

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = this.datesToHighlight
      .map((strDate) => new Date(strDate))
      .some(
        (d) =>
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
      );

    console.log(highlightDate);

    return highlightDate ? 'special-date' : '';
  };

  disablePastDatesFilter = (d: Date): boolean => {
    const today = new Date(); // Get today's date
    // today.setHours(0, 0, 0, 0); // Set time to start of the day

    // Disable if the date is before today or if it's a weekend (Saturday or Sunday)
    return d > today && d.getDay() !== 0 && d.getDay() !== 6;
  };

  // dateClass(date: Date) {
  //   const highlightDates = [  // Ensure consistent formatting (YYYY-MM-DD)
  //     '2024-05-20',
  //     '2024-06-15'
  //   ];
  //   const formattedDate = date.toISOString().slice(0, 10);

  //   // **Check for class name specific to Material-UI 16:**
  //   const calendarCellClass = 'mat-calendar-cell';  // Adjust based on actual class name
  //   const highlight = highlightDates.includes(formattedDate) ? `${calendarCellClass} highlighted-date` : calendarCellClass;
  //   console.log(highlight);
  //   return highlight;
  // }
}
