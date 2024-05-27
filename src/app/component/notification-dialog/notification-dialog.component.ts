import { Component, Inject,ChangeDetectorRef, EventEmitter, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  // @Output() notificationsCleared = new EventEmitter<void>();
  dialogClosed: any;

  notifications: { id: number, message: string, userId: number, mealId: number | null, timeStamp: string }[] = [];
  notificationCount: number = 0;

  constructor(
    // public dialogRef: MatDialogRef<NotificationDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: { notifications: string[] },
    private notification: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.fetchNotification();
  }




  ngOnInit(): void {
  // this.fetchNotification();

}

fetchNotification(): void {
  const email = localStorage.getItem("email");

  console.log("Noti", email);
  if (email) {
    this.notification.getNotifications(email).subscribe(response => {
      if (response.statusCode === 200) {
        console.log("notification: ", response);
        this.notifications = response.notifications;
        this.notificationCount = this.notifications.length;
        this.cdr.detectChanges(); // Ensure the view is updated
      }
    });
  }
}







  // removeNotification(index: number): void {
  //   this.data.notifications.splice(index, 1);
  //   this.updateLocalStorage();
  //   if (this.data.notifications.length === 0) {
  //     this.dialogRef.close();
  //     this.notificationsCleared.emit();
  //   }
  // }

  // clearNotifications(): void {
  //   this.data.notifications = [];
  //   this.updateLocalStorage();
  //   this.notificationsCleared.emit();    
  // }

  // updateLocalStorage(): void {
  //   localStorage.setItem('notifications', JSON.stringify(this.data.notifications));
  // }

}

