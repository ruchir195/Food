import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCard, MatCardModule} from '@angular/material/card';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from "./shared/shared.module";
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { QrCodeComponent } from './component/qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatNativeDateModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddBookingComponent } from './component/add-booking/add-booking.component';
import { ViewBookingComponent } from './component/view-booking/view-booking.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { QuickBookComponent } from './component/quick-book/quick-book.component';
import { CancelBookingComponent } from './component/cancel-booking/cancel-booking.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LogoutComponent } from './pages/logout/logout.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationDialogComponent } from './component/notification-dialog/notification-dialog.component';
// import { MatErrorModule } from '@angular/material/core';
import {MatIconModule } from '@angular/material/icon';
import { AuthInterceptor } from './pages/interceptor/auth.interceptor';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [
        AppComponent,
        QrCodeComponent,
        AddBookingComponent,
        ViewBookingComponent,
        QuickBookComponent,
        CancelBookingComponent,
        LogoutComponent,
        HomeComponent,        
        NotificationDialogComponent,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },DatePipe,],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        NgxUiLoaderModule,
        NgbNavModule,
        NgbModule,
        HttpClientModule,
        NgToastModule,
        NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
        NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
        SharedModule,
        DashboardModule,
        MatListModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatNativeDateModule,
        QRCodeModule,
        MatDialogModule,
        MatRadioModule, 
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule
        // MatErrorModule


        
    ]
})
export class AppModule { }
