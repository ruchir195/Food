import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent {

  @Output() notificationsCleared = new EventEmitter<void>();
  dialogClosed: any;

  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { notifications: string[] }
  ) {}

  removeNotification(index: number): void {
    this.data.notifications.splice(index, 1);
    this.updateLocalStorage();
    if (this.data.notifications.length === 0) {
      this.dialogRef.close();
      this.notificationsCleared.emit();
    }
  }

  clearNotifications(): void {
    this.data.notifications = [];
    this.updateLocalStorage();
    this.notificationsCleared.emit();    
  }

  updateLocalStorage(): void {
    localStorage.setItem('notifications', JSON.stringify(this.data.notifications));
  }

}

