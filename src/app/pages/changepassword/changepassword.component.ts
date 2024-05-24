import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  hide = true;
  type = "password"; 
  

  toggleVisibility(): void {    
    this.hide = !this.hide;
    this.type == "password" ? this.type ="text": this.type = "password"
  }
  
    
  
changePasswordForm !: FormGroup;
hideOld= true;
hideNew= true;
hideconfirm= true;
typeOld="password"
typeNew="password"
storedMessage: string | undefined;
// newpasFrom !: FormGroup
// newpasForm !: FormGroup<{ password: FormControl<string | null>; }>;

constructor(  private fb : FormBuilder,
  private auth: AuthService,
   private router: Router,
 private toast: NgToastService,
 private userStore: UserStoreService,
 private notification: NotificationService) 
{

}

ngOnInit(): void
{
  this.changePasswordForm=this.fb.group({
    opassword: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
    newpassword: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
    cpassword: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]] 

  // At least 6 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character (@, $, !, %, *, ?, &)

  })
}
   

  onSubmite(){
    if(this.changePasswordForm.valid)
      {
        console.log(this.changePasswordForm.value);
        // alert("Password Change Sucessful")

       

        if(this.changePasswordForm.value.newpassword === this.changePasswordForm.value.cpassword){
          
          this.auth.changePassword(this.changePasswordForm.value)
          .subscribe({
            next:(res) => {
              // alert(res.message);
              this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
              this.storedMessage = res.message;
              this.changePasswordForm.reset();
              




              console.log("STMSG: ",this.storedMessage);
               // Trigger the notification after the storedMessage is set
               this.notification.notification(this.storedMessage)
               .subscribe({
                 next: (notifRes) => {
                   this.toast.success({ detail: "SUCCESS", summary: "Ruchur parmar", duration: 5000 });
                 },
                 error: (notifErr) => {
                   this.toast.error({ detail: "ERROR", summary: notifErr?.error.message, duration: 5000 });
                 }
               });
               this.router.navigate(['login']);
            },
            error:(err) => {
              // alert(err?.error.message);
              this.toast.error({detail:"ERROR", summary:err?.error.message, duration:5000});
            }
          })

          // ------------notification------------
          
          // console.log(this.storedMessage);
          // this.notification.notification(this.storedMessage)
          // .subscribe({
          //   next:(res) => {
          //     // alert(res.message);
          //     this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
          //     this.changePasswordForm.reset();
          //     this.router.navigate(['login']);
          //   },
          //   error:(err) => {
          //     // alert(err?.error.message);
          //     this.toast.error({detail:"ERROR", summary:err?.error.message, duration:5000});
          //   }
          // })







        }else{
          this.toast.error({detail:"ERROR", summary:"password and confirm password not match", duration:5000});
          // alert("password and confirm password not match");
        }
        //send data to database
      }
      else
      {

        if (this.changePasswordForm.controls['opassword'].invalid && this.changePasswordForm.controls['newpassword'].invalid) {
          this.toast.warning({ detail: 'ERROR', summary: 'Please enter a valid information', duration: 5000 });
        } else {
          if (this.changePasswordForm.controls['opassword'].invalid) {
            if (this.changePasswordForm.controls['opassword'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a old password', duration: 5000 });
            } else if (this.changePasswordForm.controls['opassword'].errors?.['pattern']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a valid email address', duration: 5000 });
            }
          }
          if (this.changePasswordForm.controls['newpassword'].invalid) {
            if (this.changePasswordForm.controls['newpassword'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a new password', duration: 5000 });
            } else if (this.changePasswordForm.controls['newpassword'].errors?.['pattern']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)', duration: 5000 });
            }
          }

          if (this.changePasswordForm.controls['cpassword'].invalid) {
            if (this.changePasswordForm.controls['cpassword'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a Confirm password', duration: 5000 });
            } else if (this.changePasswordForm.controls['cpassword'].errors?.['pattern']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)', duration: 5000 });
            }
          }
        }

        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        ValidateForm.validateAllFormFields(this.changePasswordForm)
        // alert("Your form is invalid");
      } 
  }
  
}
