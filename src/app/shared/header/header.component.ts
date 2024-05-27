import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from 'src/app/component/notification-dialog/notification-dialog.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private dialogRef: MatDialog) { }

  uniqueName: string | null = null;
  name: string | null = null;

  notifications: string[] = [];
  notificationCount: number = 0;

  ngOnInit(): void {
    this.uniqueName = this.auth.getUniqueName();
    console.log('Unique Name: ', this.uniqueName);

    let email = localStorage.getItem("email");

    if (email) {
      this.auth.getUserDetails(email).subscribe(
        data => {
          this.name = data.firstName;
          console.log('User Details: ', this.name);
        },
        error => {
          console.error('Error fetching user details: ', error);
        }
      );
    }
  }




  

  logout(): void {
    this.auth.signOut();
  }

  openDialog(): void {
    this.dialogRef.open(LogoutComponent);
  }

  openNotifications(): void {
    this.dialogRef.open(NotificationDialogComponent);
  }

  // openNotifications(): void {
  //   // event.stopPropagation();
  //   const dialogRef = this.dialogRef.open(NotificationDialogComponent, {
  //     width: '300px',
  //     // data: { notifications: this.notifications }
  //   });

    // dialogRef.componentInstance.notificationsCleared.subscribe(() => {
    //   this.notifications = [];
    //   this.notificationCount = 0;
    // });

    // dialogRef.componentInstance.dialogClosed.subscribe(() => {
    //   this.notificationCount = this.notifications.length;
    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.notificationCount = this.notifications.length;
    //   // Optionally save to localStorage
    //   // localStorage.setItem('notifications', JSON.stringify(this.notifications));
    // });
  }
// }
