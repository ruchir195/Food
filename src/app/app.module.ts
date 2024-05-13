import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OTPValidationComponent } from './otp-validation/otp-validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCard, MatCardModule} from '@angular/material/card';
import { SingupComponent } from './singup/singup.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,
    ForgotPasswordComponent,
    OTPValidationComponent,
    SingupComponent,
    NewpasswordComponent,
    ChangepasswordComponent,   
    DashboardComponent, 
    FooterComponent,
     SideNavComponent,
     HeaderComponent,
     AboutusComponent,
     TermsandconditionComponent,
     PrivacyPolicyComponent,
     ContactusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MatCardModule,
    NgxUiLoaderModule,
    NgbNavModule,
    NgbModule,

    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    NgxUiLoaderRouterModule.forRoot({showForeground: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
