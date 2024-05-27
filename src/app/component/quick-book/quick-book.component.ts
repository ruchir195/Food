import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';


@Component({
  selector: 'app-quick-book',
  templateUrl: './quick-book.component.html',
  styleUrls: ['./quick-book.component.css']
})
export class QuickBookComponent {
quickbookForm!: FormGroup;
isFormVisible = true;
// minDate: Date;
myFilter: (d: Date | null) => boolean;

minDate = new Date(); // Minimum selectable date (starting from today)
  
// Function to filter dates (disable past dates and weekends)
filterPredicate = (date: Date | null): boolean => {
  const day = (date || new Date()).getDay();
  return day !== 0 && day !== 6 && (date || new Date()) >= this.minDate;
};

constructor(
   private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuickBookComponent>,
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
  this.quickbookForm = this.fb.group({
    category: ['', Validators.required],
    mealType: ['', Validators.required],
    selectedDate: [null, [Validators.required, this.dateValidator.bind(this)]]
  });
}

closeForm() {
  this.dialogRef.close();
}

quickBookMeal(): void {
  if (this.quickbookForm.valid) {
    console.log(this.quickbookForm.value);
    this.booking.quickBook(this.quickbookForm.value).subscribe({
      next:(res=>{    
        console.log("username: ",res);
        // alert("Login successfully.")
        this.quickbookForm.reset();
       
        
        this.toast.success({detail:"SUCCESS", summary:"Quick book Meal successfully.", duration:5000});
        this.router.navigate(['/dashboard/home']);
        this.closeForm();
        
      }),
      error:(err=>{
        console.log("er: ",err.error);
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

