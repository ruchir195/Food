import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  hide = true;
  type = "password"; 
  newpasForm !: FormGroup<{ password: FormControl<string | null>; }>;

  
  
loginForm !: FormGroup;
hideOld= true;
hideNew= true;
hideconfirm= true;
typeOld="password"
typeNew="password"
newpasFrom !: FormGroup

constructor(private fb:FormBuilder)
{

}

ngOnInit(): void
{
  this.newpasForm=this.fb.group({ 

    password: ['',Validators.required]    
  })
}
   
toggleVisibility(): void {    
  this.hide = !this.hide;
  this.type == "password" ? this.type ="text": this.type = "password"
}

toggleVisibility1(): void {
  this.hide = !this.hide;
  this.type == "password" ? this.type ="text": this.type = "password"
}

toggleVisibility2(): void {
  this.hide = !this.hide;
  this.type == "password" ? this.type ="text": this.type = "password"
}

  onSubmite(){
    if(this.newpasForm.valid)
      {
        console.log(this.newpasForm.value);
        alert("Password Change Sucessful")
        //send data to database
      }
      else
      {
        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        this.validdateAllFromFileds(this.newpasForm)
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
}
