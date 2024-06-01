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
selectedDate: any;
// minDate: Date;


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
 
}

ngOnInit(): void {
  this.quickbookForm = this.fb.group({
    category: ['', Validators.required],
    mealType: ['', Validators.required],
    
  });
  this.setSelectedDate();
}

setSelectedDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayOfWeek = tomorrow.getDay();
  if(dayOfWeek === 5){
    tomorrow.setDate(tomorrow.getDate() + 3); // move to monday
  } else if (dayOfWeek === 6) { // Saturday
    tomorrow.setDate(tomorrow.getDate() + 2); // Move to Monday
  } else if (dayOfWeek === 0) { // Sunday
    tomorrow.setDate(tomorrow.getDate() + 1); // Move to Monday
  }

  this.selectedDate = tomorrow;
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





}

