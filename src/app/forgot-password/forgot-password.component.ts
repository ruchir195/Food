import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{
  
  forgotFrom !: FormGroup;

  constructor(private fb:FormBuilder)
  {
  
  }
  
  ngOnInit(): void
  {
    this.forgotFrom=this.fb.group({
      email: ['',Validators.required],          
    })
  }
     
  
    onSubmite(){
      if(this.forgotFrom.valid)
        {
          console.log(this.forgotFrom.value);
          alert("OTP send on given Email")
          //send data to database
        }
        else
        {
          console.log("form is not valid");
          //throw a error using toaster and with  required fileds
          this.validdateAllFromFileds(this.forgotFrom)
          alert("Your form is invalid");
        } 
    }
    
    
    private validdateAllFromFileds(formGroup:FormGroup)
    {
      Object.keys(formGroup.controls).forEach(field=>{
        const control = formGroup.get(field);
        if(control instanceof FormControl){
          control.markAsDirty({onlySelf:true});
        }  
        else if(control instanceof FormGroup){
          this.validdateAllFromFileds(control)
        }    
      })
    }  






  // forgotForm!: FormGroup;

  // constructor(private formBuilder : FormBuilder){}

  // ngOnInit(): void {
      
  //   this.forgotForm =this.formBuilder.group({
  //     EmailValidator:['',[Validators.required,Validators.email]]
  //   });
  // }

  // get formControl(){
  //   return this.forgotForm.controls;
  // }

  // onSubmit(){
  //   if(this.forgotForm.invalid){
  //     return;
  //   }
      
  // }

}
