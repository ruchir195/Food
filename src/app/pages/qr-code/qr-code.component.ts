import { Component } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { AuthService } from '../../services/auth.service';
import {CoupenService} from '../../services/coupen.service'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
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


  onChange(url: SafeValue) {
    // this.qrCodeDownloadeLink = url;
  }

  ngOnInit() {
    // Initialization logic if needed
  }

  constructor(private auth: AuthService, private coupen: CoupenService, private toast: NgToastService) {}

  onClick() {
    this.coupen.addCoupon(this.qrdata).subscribe((res) => {
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
    });
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