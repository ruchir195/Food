import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/pages/logout/logout.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private auth: AuthService, private dialogRef : MatDialog) { }
  logout(){
    this.auth.signOut();
  }



  openDialog(){
    this.dialogRef.open(LogoutComponent);
  }
}
