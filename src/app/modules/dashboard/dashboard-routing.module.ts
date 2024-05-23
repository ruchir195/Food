import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from 'src/app/pages/aboutus/aboutus.component';
import { ChangepasswordComponent } from 'src/app/pages/changepassword/changepassword.component';
import { ContactusComponent } from 'src/app/pages/contactus/contactus.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { NewpasswordComponent } from 'src/app/pages/newpassword/newpassword.component';
import { OTPValidationComponent } from 'src/app/pages/otp-validation/otp-validation.component';
import { PrivacyPolicyComponent } from 'src/app/pages/privacy-policy/privacy-policy.component';
import { SingupComponent } from 'src/app/pages/singup/singup.component';
import { TermsandconditionComponent } from 'src/app/pages/termsandcondition/termsandcondition.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'singup',component:SingupComponent},
  {
    path:'', children:[
      {
        component:AboutusComponent ,
        path:'aboutus',
        canActivate:[AuthGuard]
      },
      {
        component:ChangepasswordComponent,
        path:'changepassword',
        canActivate:[AuthGuard]
      },
      {
        component:ContactusComponent,
        path: 'contactus',
        canActivate:[AuthGuard]
      },
      {
        component:NewpasswordComponent,
        path: 'newpassword'
      },
      {
        component:OTPValidationComponent,
        path:'otp-validation'
      },
      {
        component:PrivacyPolicyComponent,
        path:'privacy-policy',
        canActivate:[AuthGuard]
      },
      {
        component:TermsandconditionComponent,
        path:'termsandcondition',
        canActivate:[AuthGuard]
      },
      {
        component:HomeComponent,
        path:'home',
        canActivate:[AuthGuard]
      }
     
    ]
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
