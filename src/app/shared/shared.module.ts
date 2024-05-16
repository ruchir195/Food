import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      FooterComponent,
      HeaderComponent,
      SideNavComponent,
  
    ],
  
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      // CustomDialogComponent
    ],
    exports: [
      FooterComponent,
      HeaderComponent,
      SideNavComponent,
   
    ]
  })
  export class SharedModule { }
  