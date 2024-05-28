import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from 'src/app/component/notification-dialog/notification-dialog.component';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { AuthService } from 'src/app/services/auth.service';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private auth: AuthService, private dialogRef: MatDialog,public dialog: MatDialog, private notification: NotificationService,private cdr: ChangeDetectorRef) { }

  uniqueName: string | null = null;
  name: string | null = null;


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
    // ---notification------
    const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        this.notifications = JSON.parse(savedNotifications);
        this.notificationCount = this.notifications.filter(n => !n.read).length;
      }



      if(email){
        this.notification.getNotifications(email).subscribe((response) => {
          if (response.statusCode === 200) {
            console.log('notification: ', response);
            this.notifications = response.notifications;
            this.notificationCount = this.notifications.length;
            console.log(this.notificationCount);
            this.cdr.detectChanges(); // Ensure the view is updated
          }
        });
      }
     

  }  

  logout(): void {
    this.auth.signOut();
  }

  openDialog(): void {
    this.dialogRef.open(LogoutComponent);
  }


  // -------------Notification-----------------------


    notifications: Notification[] = [];  
    notificationCount: number = 0;

  
    openNotifications(event: MouseEvent): void {
      console.log("this : ",this.notifications);
      event.stopPropagation();
      const dialogRef = this.dialog.open(NotificationDialogComponent, {
        width: '300px',
        data: { notifications: this.notifications }
      });
  
      dialogRef.componentInstance.notificationsCleared.subscribe(() => {
        this.notificationCount = 0;
      });
  
      dialogRef.componentInstance.dialogClosed.subscribe(() => {
        this.notificationCount = this.notifications.filter(n => !n.read).length;
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.notificationCount = this.notifications.filter(n => !n.read).length;
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
      });
    }




}