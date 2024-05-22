import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';
import ValidateForm from '../../helpers/validateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup;

// --------------LogicforEyeOption---------------
  hide = true;
  type = "password"; 


  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type == "password" ? this.type ="text": this.type = "password"
  }   

// -------------LogicforValidation--------------



constructor(
  private fb : FormBuilder,
   private auth: AuthService,
    private router: Router,
  private toast: NgToastService,
  private userStore: UserStoreService
){}

ngOnInit(): void
{
  this.loginForm=this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]] 

  // At least 8 characters long
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character (@, $, !, %, *, ?, &)

  })
}
   

onLogin(){
    if(this.loginForm.valid)
      {
        console.log(this.loginForm.value);
        // alert("Form Login successfully.")
        localStorage.setItem('email',this.loginForm.value.username);
        this.auth.login(this.loginForm.value).subscribe({
          next:(res=>{    
            // console.log(res);
            // alert("Login successfully.")
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            const tokenPayload = this.auth.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.unique_name);
            this.userStore.setRoleForStore(tokenPayload.role);
            
            this.toast.success({detail:"SUCCESS", summary:"Login successfully.", duration:5000});
            this.router.navigate(['/dashboard/home']);
            
          }),
          error:(err=>{
            console.log(err);
            // alert(err.error.message);
            this.toast.error({detail:"ERROR", summary:err.error.message, duration:5000});
  
          })
          })
      }
      else
      {
        if (this.loginForm.controls['username'].invalid && this.loginForm.controls['password'].invalid) {
          this.toast.warning({ detail: 'ERROR', summary: 'Please enter a valid email address and password', duration: 5000 });
        } else {
          if (this.loginForm.controls['username'].invalid) {
            if (this.loginForm.controls['username'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter an email address', duration: 5000 });
            } else if (this.loginForm.controls['username'].errors?.['email']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a valid email address', duration: 5000 });
            }
          }
          if (this.loginForm.controls['password'].invalid) {
            if (this.loginForm.controls['password'].errors?.['required']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Please enter a password', duration: 5000 });
            } else if (this.loginForm.controls['password'].errors?.['pattern']) {
              this.toast.warning({ detail: 'ERROR', summary: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)', duration: 5000 });
            }
          }
        }
  
        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        ValidateForm.validateAllFormFields(this.loginForm);
        // this.toast.warning({detail:"ERROR", summary:"Please enter valid email and password", duration:5000});
        // alert("Please enter valid email and password");
      } 
  }
}
