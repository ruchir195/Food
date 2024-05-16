import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthS } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
// import ValidateForm from '../helpers/validateForm';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactform! : FormGroup;

  constructor(
    private fb:FormBuilder,
    // private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ){}

  ngOnInit(): void
  {
    this.contactform=this.fb.group({
      email :['',Validators.required],
      phone :['',Validators.required,Validators.maxLength(10)],
      msg:['',Validators.required]
    })
  }

  // onSubmit(){
  //   if(this.contactform.valid){
  //     console.log(this.contactform.value);
  //     this.auth.signUp(this.contactform.value)
  //     .subscribe({
  //       next:(res) => {
  //         // alert(res.message);
  //         this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
  //         this.contactform.reset();
  //         this.router.navigate(['login']);
  //       },
  //       error:(err) => {
  //         // alert(err?.error.message);
  //         this.toast.error({detail:"ERROR", summary:"something went wrong", duration:5000});
  //       }
  //     })
        
  //   }
  //   else{
  //     ValidateForm.validateAllFormFields(this.contactform);
  //     // alert("Your form is invalid");
  //   }

}
