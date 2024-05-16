import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from 'src/app/layouts/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ForgotPasswordComponent } from 'src/app/pages/forgot-password/forgot-password.component';
import { SingupComponent } from 'src/app/pages/singup/singup.component';
import { AboutusComponent } from 'src/app/pages/aboutus/aboutus.component';
import { ChangepasswordComponent } from 'src/app/pages/changepassword/changepassword.component';
import { ContactusComponent } from 'src/app/pages/contactus/contactus.component';
import { NewpasswordComponent } from 'src/app/pages/newpassword/newpassword.component';
import { OTPValidationComponent } from 'src/app/pages/otp-validation/otp-validation.component';
import { PrivacyPolicyComponent } from 'src/app/pages/privacy-policy/privacy-policy.component';
import { TermsandconditionComponent } from 'src/app/pages/termsandcondition/termsandcondition.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SingupComponent,
    AboutusComponent,
    ChangepasswordComponent,
    ContactusComponent,
    NewpasswordComponent,
    OTPValidationComponent,
    PrivacyPolicyComponent,
    TermsandconditionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // MatTableModule,
    // MatIconModule,
    // MatSortModule,
    NgbModule,
    NgbNavModule,
    // DragDropModule,
    // MatSelectModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatTabsModule
  ]
})
export class DashboardModule { }
