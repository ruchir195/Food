import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  selectedDate: Date;
  cancelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private booking: BookingService,
    private toast: NgToastService,
    private router: Router,
  ) {
    this.selectedDate = data.selectedDate;

  }

  ngOnInit(): void {
    this.cancelForm = this.fb.group({
      mealType: ['',Validators.required]
    });
  }


  closeForm() {
    this.dialogRef.close();
  }


  onSubmit() {
    if (this.cancelForm.invalid) {
      return;
    }

    const mealType = this.cancelForm.value.mealType;

    let canselFormObj = {
      bookingtype: mealType,
      date: this.selectedDate
    }

    console.log("cancel Form Value: ",canselFormObj);

    console.log('Selected Date:', this.selectedDate);
    console.log('Meal Type:', mealType);
    
    this.closeForm();


    
    this.booking.cancelBooking(canselFormObj).subscribe({
      next:(res=>{    
        console.log("message: ",res);
        // alert("Login successfully.")
       
        this.closeForm();
        this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
       
        this.router.navigate(['/dashboard/home']);
        
      }),
      error:(err=>{
        console.log("cancel error: ",err);
        // alert(err.error.message);
        this.toast.error({detail:"ERROR", summary:err.error, duration:5000});
        this.closeForm();

      })
      })
     
  }

}
