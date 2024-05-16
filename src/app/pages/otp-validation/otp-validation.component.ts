import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validateForm';


@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OTPValidationComponent {

  hide = true;
  type = "password"; 

  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type == "password" ? this.type ="text": this.type = "password"
  }

  
  otpfrom !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
   ){}
  
  

ngOnInit(): void
{
  this.otpfrom=this.fb.group({    
    otp: ['',Validators.required, Validators.length == 6]    
  })
}
   

onSubmit(){
      if(this.otpfrom.valid){
        console.log(this.otpfrom.value);

        var backOtp = localStorage.getItem("otp");
        console.log("otp: ",backOtp);

        var userOtp = this.otpfrom.value;
        console.log("userotp: ",userOtp.otp);

        if(backOtp === userOtp.otp){
          this.toast.success({detail:"SUCCESS", summary:"OTP is Correct", duration:5000});
          this.router.navigate(['newpassword']);
        }
        else{
          this.toast.error({detail:"ERROR", summary:"OTP is InCorrect", duration:5000});
          this.router.navigate(['otp-validation']);
        }
        
        
        //send data to database
        // this.auth.otp(this.otpfrom.value)
        // .subscribe({
        //   next:(res) => {
        //     // alert(res.message);
        //     this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
        //     this.otpfrom.reset();
        //     this.router.navigate(['newpassword']);
        //   },
        //   error:(err) => {
        //     // alert(err?.error.message);
        //     this.toast.error({detail:"ERROR", summary:"something went wrong", duration:5000});
        //   }
        // })
          
      }
      else
      {
        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        ValidateForm.validateAllFormFields(this.otpfrom)
        alert("Your form is invalid");
      } 
  }

}
