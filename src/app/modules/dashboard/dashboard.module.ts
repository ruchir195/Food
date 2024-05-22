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
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddBookingComponent } from 'src/app/pages/add-booking/add-booking.component';
import { MatButtonModule } from '@angular/material/button';
// import { MatErrorModule } from '@angular/material/core';



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
    TermsandconditionComponent,
    // AddBookingComponent
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
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
  ]
})
export class DashboardModule { }
