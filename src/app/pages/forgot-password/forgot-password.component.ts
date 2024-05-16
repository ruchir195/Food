import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{
  
  forgotFrom !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
   ){}
  
  
  ngOnInit(): void
  {
    this.forgotFrom=this.fb.group({
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]     
    })
  }
     
  
  onSubmit(){
        if(this.forgotFrom.valid){
          console.log(this.forgotFrom.value);
          alert("OTP send on given Email")
          //send data to database
          this.auth.forgetPassword(this.forgotFrom.value)
          .subscribe({
            next:(res) => {
              // alert(res.message);
              console.log(res);
              localStorage.setItem("email",this.forgotFrom.value.email);
              localStorage.setItem("otp",res.otp);
              this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
              this.forgotFrom.reset();
              this.router.navigate(['otp-validation']);
            },
            error:(err) => {
              // alert(err?.error.message);
              this.toast.error({detail:"ERROR", summary:"something went wrong", duration:5000});
            }
          })
            
        }
        else
        {
          console.log("form is not valid");
          //throw a error using toaster and with  required fileds
          ValidateForm.validateAllFormFields(this.forgotFrom)
          alert("Your form is invalid");
        } 
    }
     






  // forgotForm!: FormGroup;

  // constructor(private formBuilder : FormBuilder){}

  // ngOnInit(): void {
      
  //   this.forgotForm =this.formBuilder.group({
  //     EmailValidator:['',[Validators.required,Validators.email]]
  //   });
  // }

  // get formControl(){
  //   return this.forgotForm.controls;
  // }

  // onSubmit(){
  //   if(this.forgotForm.invalid){
  //     return;
  //   }
      
  // }

}
