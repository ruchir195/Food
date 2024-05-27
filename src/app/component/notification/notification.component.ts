import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: string[] = [];
  notificationInput: string = '';
  notificationCount: number = 0;

  constructor(public dialog: MatDialog, private notification: NotificationService) {} // Inject MatDialog

  ngOnInit(): void {
    // const savedNotifications = localStorage.getItem('notifications');
    // if (savedNotifications) {
    //   this.notifications = JSON.parse(savedNotifications);
    //   this.notificationCount = this.notifications.length;
    // }


   
  }

  // addNotification(): void {
  //   if (this.notificationInput.trim()) {
  //     this.notifications.push(this.notificationInput.trim());
  //     this.notificationCount++;
  //     this.notificationInput = '';
  //     localStorage.setItem('notifications', JSON.stringify(this.notifications));
  //   }
  // }

  // openNotifications(event: MouseEvent): void {
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(NotificationDialogComponent, {
  //     width: '300px',
  //     data: { notifications: this.notifications }
  //   });

  //   dialogRef.componentInstance.notificationsCleared.subscribe(() => {
  //     this.notificationCount = 0;
  //   });

  //   dialogRef.componentInstance.dialogClosed.subscribe(() => {
  //     this.notificationCount = this.notifications.length;
  //     localStorage.setItem('notifications', JSON.stringify(this.notifications));
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.notificationCount = this.notifications.length;
  //     localStorage.setItem('notifications', JSON.stringify(this.notifications));
  //   });
  // }

}
