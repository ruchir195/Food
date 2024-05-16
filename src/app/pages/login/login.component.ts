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
    username: ['',Validators.required],
    password: ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]] 

  // At least 6 characters long
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
        alert("Form Login successfully.")
        this.auth.login(this.loginForm.value).subscribe({
          next:(res=>{    
            // alert(res.message);
            this.loginForm.reset();
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            const tokenPayload = this.auth.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.unique_name);
            this.userStore.setRoleForStore(tokenPayload.role);
            
            this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
            this.router.navigate(['dashboard']);
          }),
          error:(err=>{
            // alert(err?.error.message)
            this.toast.error({detail:"ERROR", summary:"something went wrong", duration:5000});
  
          })
          })
      }
      else
      {
        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        ValidateForm.validateAllFormFields(this.loginForm);
        alert("Your form is invalid");
      } 
  }
}
