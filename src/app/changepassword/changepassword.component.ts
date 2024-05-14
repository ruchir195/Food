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
  

  toggleVisibility(): void {    
    this.hide = !this.hide;
    this.type == "password" ? this.type ="text": this.type = "password"
  }
  
    
  
loginForm !: FormGroup;
hideOld= true;
hideNew= true;
hideconfirm= true;
typeOld="password"
typeNew="password"
newpasFrom !: FormGroup
newpasForm !: FormGroup<{ password: FormControl<string | null>; }>;

constructor(private fb:FormBuilder)
{

}

ngOnInit(): void
{
  this.newpasForm=this.fb.group({ 
    // opassword: ['',Validators.required],
    password: ['',Validators.required],    
  })
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
