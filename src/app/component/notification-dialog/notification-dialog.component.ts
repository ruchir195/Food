import {
  Component,
  Inject,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css'],
})
export class NotificationDialogComponent implements OnInit {
  [x: string]: any;
  @Output() notificationsCleared = new EventEmitter<void>();
  @Output() dialogClosed = new EventEmitter<void>();

  notifications: {
    read: boolean;
    id: number;
    message: string;
    userId: number;
    mealId: number | null;
    timeStamp: string;
  }[] = [];
  notificationCount: number = 0;
  


  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notifications: Notification[] },
    private notification: NotificationService,
    private cdr: ChangeDetectorRef,
    private auth: AuthService
  ) {
    this.fetchNotification();
  }

  markAsRead(index: number): void {
    this.notificationCount--;
    console.log(this.notificationCount);
    this.notifications[index].read = true
    this.updateLocalStorage();
    this.dialogClosed.emit();
  }

  markAsUnread(index: number): void {
    this.notificationCount++;
    console.log(this.notificationCount);
    this.notifications[index].read  = false
    this.updateLocalStorage();
    this.dialogClosed.emit();
  }

  clearNotifications(): void {
    this.data.notifications.forEach(
      (notification) => (notification.read = true)
    );
    this.updateLocalStorage();
    this.notificationsCleared.emit();
  }

  ngOnInit(): void {
    // this.fetchNotification();
  }

  fetchNotification(): void {

    const token = this.auth.decodedToken();
    // const email = localStorage.getItem('email');

    // console.log('Noti', token.email);
    if (token.email) {
      this.notification.getNotifications(token.email).subscribe((response) => {
        if (response.statusCode === 200) {
          // console.log('notification: ', response);
          this.notifications = response.notifications;
          this.notificationCount = this.notifications.length;
          // console.log(this.notificationCount);
          this.cdr.detectChanges(); // Ensure the view is updated
        }
      });
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem(
      'notifications',
      JSON.stringify(this.data.notifications)
    );
  }
}
