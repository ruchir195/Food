import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private auth: AuthService, private dialogRef : MatDialog) { }
  logout(){
    this.auth.signOut();
    this.closeForm();
  }

  closeForm() {
    this.dialogRef.closeAll();
  }
}
