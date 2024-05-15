import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OTPValidationComponent } from './otp-validation/otp-validation.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { SingupComponent } from './singup/singup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
    {path:'header',component:HeaderComponent}
  ,{path:'',component:LoginComponent},  
  {path:'login',component:LoginComponent} 
  ,{path:'forgot-password',component:ForgotPasswordComponent}
  ,{path:'otp-validation',component:OTPValidationComponent}
  ,{path:'singup',component:SingupComponent}
  ,{path:'newpassword',component:NewpasswordComponent}
  ,{path:'changepassword',component:ChangepasswordComponent}
  ,{path:'dashboard',component:DashboardComponent}
  ,{path:'side-nav',component:SideNavComponent}
  ,{path:'footer',component:FooterComponent}
  ,{path:'aboutus',component:AboutusComponent}
  ,{path:'termsandcondition',component:TermsandconditionComponent}
  ,{path:'privacy-policy',component:PrivacyPolicyComponent}
  ,{path:'contactus',component:ContactusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
