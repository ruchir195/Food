import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  signupForm!: FormGroup;

  // --------------LogicforEyeOption---------------
  hide = true;
  type = "password";

  hide2 = true;
  type2 = "password";

  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type == "password" ? this.type = "text" : this.type = "password"
  }

  toggleVisibility2(): void {
    this.hide = !this.hide2;
    this.type2 == "password" ? this.type2 = "text" : this.type2 = "password"
  }


  // -------------LogicforValidation--------------


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]]
      // cpassword:['',Validators.required],

    })
  }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value)
        .subscribe({
          next: (res) => {
            // alert("Signup successfully");
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            console.log(err);
            // alert(err.error.message);
            this.toast.error({ detail: "ERROR", summary: err.error.message, duration: 5000 });
          }
        })

    }
    else {

      if (this.signupForm.controls['firstName'].invalid && this.signupForm.controls['lastName'].invalid && this.signupForm.controls['email'].invalid && this.signupForm.controls['username'].invalid && this.signupForm.controls['password'].invalid) {
        this.toast.warning({ detail: 'ERROR', summary: 'Please enter information', duration: 5000 });
      } else {
        if (this.signupForm.controls['firstName'].invalid) {
          this.toast.warning({ detail: 'ERROR', summary: 'Please enter your first name', duration: 5000 });
        }
        if (this.signupForm.controls['lastName'].invalid) {
          this.toast.warning({ detail: 'ERROR', summary: 'Please enter your last name', duration: 5000 });
        }
        if (this.signupForm.controls['email'].invalid) {
          if (this.signupForm.controls['email'].errors?.['required']) {
            this.toast.warning({ detail: 'ERROR', summary: 'Please enter an email address', duration: 5000 });
          } else if (this.signupForm.controls['email'].errors?.['email'] || this.signupForm.controls['email'].errors?.['pattern']) {
            this.toast.warning({ detail: 'ERROR', summary: 'Please enter a valid email address', duration: 5000 });
          }
        }
        if (this.signupForm.controls['username'].invalid) {
          this.toast.warning({ detail: 'ERROR', summary: 'Please enter a username', duration: 5000 });
        }
        if (this.signupForm.controls['password'].invalid) {
          if (this.signupForm.controls['password'].errors?.['required']) {
            this.toast.warning({ detail: 'ERROR', summary: 'Please enter a password', duration: 5000 });
          } else if (this.signupForm.controls['password'].errors?.['pattern']) {
            this.toast.warning({ detail: 'ERROR', summary: 'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)', duration: 5000 });
          }
        }
        
      }

      ValidateForm.validateAllFormFields(this.signupForm);
        // this.toast.error({ detail: 'ERROR', summary: 'Please fill in the required fields', duration: 5000 });


        // ValidateForm.validateAllFormFields(this.signupForm);
        // // alert("Something went wrong");
        // this.toast.error({detail:"ERROR", summary:"Something went wrong", duration:5000});
    }
  }



}
