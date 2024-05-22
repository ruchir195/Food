import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  cancelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CancelBookingComponent>
  ) {}

  ngOnInit(): void {
    this.cancelForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  closeForm() {
    this.dialogRef.close();
  }

  openCancel(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      this.closeForm();
    }
  }
}
