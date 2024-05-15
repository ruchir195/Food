import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../helpers/validateForm';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit{

  signupForm!: FormGroup;

// --------------LogicforEyeOption---------------
hide = true;
type = "password"; 

hide2 = true;
type2 = "password";

toggleVisibility(): void {
  this.hide = !this.hide;
  this.type == "password" ? this.type ="text": this.type = "password"
}   

toggleVisibility2(): void {
  this.hide = !this.hide2;
  this.type2 == "password" ? this.type2 ="text": this.type2 = "password"
} 


// -------------LogicforValidation--------------


constructor(
  private fb: FormBuilder,
  private auth: AuthService,
  private router: Router,
  private toast: NgToastService
 ){}

ngOnInit(): void
{
this.signupForm=this.fb.group({  
  firstName :['',Validators.required],
  lastName:['',Validators.required],
  email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  username:['',Validators.required],
  password:['',Validators.required],
  // cpassword:['',Validators.required],
  
})
}
 

onSubmit(){
  if(this.signupForm.valid){
    console.log(this.signupForm.value);
    this.auth.signUp(this.signupForm.value)
    .subscribe({
      next:(res) => {
        // alert(res.message);
        this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      error:(err) => {
        // alert(err?.error.message);
        this.toast.error({detail:"ERROR", summary:"something went wrong", duration:5000});
      }
    })
      
  }
  else{
    ValidateForm.validateAllFormFields(this.signupForm);
    // alert("Your form is invalid");
  }
}



}
