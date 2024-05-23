import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private dialogRef : MatDialog) { }

  uniqueName: string | null = null;
  name: any = null;

  ngOnInit(): void {
    this.uniqueName = this.auth.getUniqueName();
    console.log('Unique Name: ', this.uniqueName);



    if (this.uniqueName) {
      this.auth.getUserDetails(this.uniqueName).subscribe(
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


  logout(){
    this.auth.signOut();
  }



  openDialog(){
    this.dialogRef.open(LogoutComponent);
  }
}
