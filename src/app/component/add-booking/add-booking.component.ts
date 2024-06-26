import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  isFormVisible = true;
  minDate: Date;
  myFilter: (d: Date | null) => boolean;



  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBookingComponent>,
    private booking: BookingService,
    private toast: NgToastService,
    private router: Router,
  ) {
    // Set the minimum date to tomorrow
    const today = new Date();
    this.minDate = new Date(today.setDate(today.getDate() + 1));

    // Filter function to disable dates before tomorrow and weekends
    this.myFilter = (d: Date | null): boolean => {
      if (!d) return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

      const day = d.getDay();
      const isWeekend = day === 0 || day === 6; // 0 = Sunday, 6 = Saturday

      return d > today && !isWeekend;
    };
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      // category: ['', Validators.required],
      mealType: ['', Validators.required],
      dates: this.fb.group({
        start: new FormControl(null, [Validators.required, this.dateValidator.bind(this)]),
        end: new FormControl(null, Validators.required)
      })
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  bookMeal(): void {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
      this.booking.book(this.bookingForm.value).subscribe({
        next:(res=>{    
          console.log("username: ",res);
          // alert("Login successfully.")
          this.bookingForm.reset();
         
          
          this.toast.success({detail:"SUCCESS", summary:"Book Meal successfully.", duration:5000});
          this.router.navigate(['/dashboard/home']);
          this.closeForm();
          
        }),
        error:(err=>{
          console.log(err);
          // alert(err.error.message);
          this.toast.error({detail:"ERROR", summary:err.error, duration:5000});
          this.closeForm();
        })
        })
    }
  }

  dateValidator(control: FormControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    if (!selectedDate) {
      return null;  // No date selected, validation not triggered yet
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6; // 0 = Sunday, 6 = Saturday

    if (selectedDate <= today || isWeekend) {
      return { 'dateInvalid': true };
    }
    return null;
  }

}
