import { Component, OnDestroy } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import {CoupenService} from '../../services/coupen.service'
import { NgToastService } from 'ng-angular-popup';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnDestroy{
  qrCodeDownloadeLink = '';
  
  SafeValue = '';
  public qrdata: string = '';
  // coupenCode = "";
  public coupObj= {
    coupenCode:""
  };
  public userId: any;
  showQRCode: boolean = false;
  showBtn: boolean = true;
  isExpired: boolean = false;
  expirationTimeout: any;
  secondsLeft: number = 0; // Change to secondsLeft

  expirationInterval: any; // Variable to store the interval
  uniqueId: number | null = null;

  onChange(url: SafeValue) {
    // this.qrCodeDownloadeLink = url;
  }

  ngOnInit() {
    // Initialization logic if needed
  }

  constructor(private auth: AuthService, private coupen: CoupenService, private toast: NgToastService, public dialogRef: MatDialogRef<QrCodeComponent>,) {}


  ngOnDestroy() {
    // Clear the expiration interval when the component is destroyed
    clearInterval(this.expirationInterval);
  }

  onClick() {
    const uniqueName = this.auth.getUniqueName();
    if(uniqueName){
      this.uniqueId = parseInt(uniqueName, 10);
      console.log(this.uniqueId);
      this.coupen.addCoupon(this.uniqueId).subscribe((res) => {
        console.log(res);
        this.qrdata = res.coupon.coupenCode;
        console.log(this.qrdata);
        this.userId = res.coupon.userID;
        console.log(this.userId);
        this.showQRCode = true;
        this.showBtn = false;
        console.log(res.coupon.expirationTime);
        console.log(res.coupon.createdTime);

        const currentTime = new Date().getTime();
        const expirationTime = new Date(res.coupon.expirationTime).getTime();
        const expirationDuration = expirationTime - currentTime;
  
        // Set the expiration timer
        this.setExpirationTimer(expirationDuration);
  
        // Calculate seconds left instead of minutes
        this.secondsLeft = Math.ceil(expirationDuration / 1000);
  
        this.expirationInterval = setInterval(() => {
          this.secondsLeft--;
          if (this.secondsLeft <= 0) {
            clearInterval(this.expirationInterval);
            this.isExpired = true;
            this.dialogRef.close();
            this.toast.error({ detail: "ERROR", summary: 'QR Code has expired', duration: 5000 });
          }
        }, 1000); // Update every second
  
      });
    }
   


         
  }

 
  

  setExpirationTimer(duration: number) {
    // Clear any existing timer
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
    }

    // Set a new timer to handle expiration
    this.expirationTimeout = setTimeout(() => {
      this.showQRCode = false; // Hide the QR code
      this.isExpired = true; // Show the expiration message
      // alert('QR Code has expired');
      this.toast.error({detail:"ERROR", summary:'QR Code has expired', duration:5000});
    }, duration);
  }
}