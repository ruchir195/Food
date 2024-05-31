import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  selectedDate: any;
  cancelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    private booking: BookingService,
    private toast: NgToastService,
    private router: Router,
  ) {
    this.selectedDate = new Date();
    this.selectedDate.setDate(this.selectedDate.getDate()); // Add one day
  }

  ngOnInit(): void {
    this.cancelForm = this.fb.group({
      mealType: ['',Validators.required],
      reason: ['', Validators.required]
    });
  }


  closeForm() {
    this.dialogRef.close();
  }


  onSubmit() {
    
    this.closeForm();

    if (this.cancelForm.invalid) {
      return;
    }

    const mealType = this.cancelForm.value.mealType;
    const reason = this.cancelForm.value.reason;

    
    this.selectedDate = new Date();
    this.selectedDate.setDate(this.selectedDate.getDate()); // Add one day
    console.log(this.selectedDate);

    console.log('Selected Date:', this.selectedDate);
    console.log('Meal Type:', mealType);
    console.log('Reason:', reason);
    
    this.closeForm();


    
    this.booking.cancelBooking(this.selectedDate).subscribe({
      next:(res=>{    
        console.log("message: ",res);
        // alert("Login successfully.")
       
        
        this.toast.success({detail:"SUCCESS", summary:`Tomorrow meal Canceld successfully.`, duration:5000});
        this.router.navigate(['/dashboard/home']);
        
      }),
      error:(err=>{
        console.log(err);
        // alert(err.error.message);
        this.toast.error({detail:"ERROR", summary:err.error, duration:5000});

      })
      })
     
  }

}
