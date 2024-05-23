import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {

  hide = true;
  type = "password"; 

  hide2 = true;
  type2 = "password";


  // newpasForm !: FormGroup<{ password: FormControl<string | null>; }>;
  // newpasForm !: FormGroup<{ cpassword: FormControl<string | null>; }>;
  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type == "password" ? this.type ="text": this.type = "password"
  }
  
  toggleVisibility2(): void {
    this.hide = !this.hide2;
    this.type2 == "password" ? this.type2 ="text": this.type2 = "password"
  
    // this.show = !this.show;
  } 

  
  newpasForm !: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
   ){}
ngOnInit(): void
{
  this.newpasForm=this.fb.group({ 
    email: localStorage.getItem("email"),
    password: ['',Validators.required],
    cpassword: ['',Validators.required]  
  })
}
   

onSubmit(){
      if(this.newpasForm.valid){
        console.log(this.newpasForm.value);
        console.log("email: ",this.newpasForm.value.email);

        if(this.newpasForm.value.password === this.newpasForm.value.cpassword){
          console.log(this.newpasForm.value.password);

          this.auth.newPassword(this.newpasForm.value)
          .subscribe({
            next:(res) => {
              // alert(res.message);
              this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
              this.newpasForm.reset();
              this.router.navigate(['login']);
            },
            error:(err) => {
              // alert(err?.error.message);
              this.toast.error({detail:"ERROR", summary:err.error.message, duration:5000});
            }
          })
        }
        else{
          this.toast.error({detail:"ERROR", summary:"Password does not match", duration:5000});
        } 
      }
      else
      {

        if (this.newpasForm.controls['password'].invalid && this.newpasForm.controls['cpassword'].invalid) {
          this.toast.warning({ detail: 'ERROR', summary: 'Please enter a Password and confirm Password', duration: 5000 });
        } else {
          if (this.newpasForm.controls['password'].invalid) {
            if (this.newpasForm.controls['password'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a password', duration: 5000 });
            } else if (this.newpasForm.controls['password'].errors?.['pattern']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)', duration: 5000 });
            }
          }

          if (this.newpasForm.controls['cpassword'].invalid) {
            if (this.newpasForm.controls['cpassword'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a Confirm password', duration: 5000 });
            } else if (this.newpasForm.controls['cpassword'].errors?.['pattern']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)', duration: 5000 });
            }
          }
        }



        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        ValidateForm.validateAllFormFields(this.newpasForm)
        // alert("Your form is invalid");
      } 
  }
}
